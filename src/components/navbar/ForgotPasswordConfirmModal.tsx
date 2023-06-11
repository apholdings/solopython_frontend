'use client';

import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CircleLoader from 'react-spinners/CircleLoader';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import Button from '../Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastSuccess } from '../toast/ToastSuccess';
import { ToastError } from '../toast/ToastError';
import axios from 'axios';

interface ForgotPasswordConfirmModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenLogin: (value: boolean) => void;
}

const ForgotPasswordConfirmModal: React.FC<ForgotPasswordConfirmModalProps> = ({
  open,
  setOpen,
  setOpenLogin,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/users/reset_password_confirm/`,
        {
          new_password,
          re_new_password,
          uid,
          token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (res.status === 204) {
        ToastSuccess('Tu contraseña ha sido cambiada correctamente.');
        router.push('/');
        setOpen(false);
      } else {
        const error = res.data;
        ToastError(error.error);
      }
    } catch (error) {
      console.error(error);

      if (
        error.response &&
        error.response.data.new_password &&
        Array.isArray(error.response.data.new_password)
      ) {
        error.response.data.new_password.forEach((errorMessage: string) => {
          ToastError(errorMessage);
        });
      }
    }
    setLoading(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-md ">
                  <p className="pt-8 mb-6 text-center text-lg font-bold tracking-tight text-gray-900 dark:text-dark-txt">
                    Change your password
                  </p>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-300 dark:border-dark-second" />
                    </div>
                    <div className="relative flex justify-center" />
                  </div>
                </div>

                <div className=" sm:mx-auto sm:w-full sm:max-w-md">
                  <div className=" py-8 px-4 sm:px-10">
                    <form onSubmit={onSubmit} className="space-y-3">
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="new_password"
                          value={new_password}
                          onChange={(e) => onChange(e)}
                          required
                          className="text-md duration block w-full border focus:ring-none focus:outline-none border-dark py-3 pl-10 font-medium shadow-neubrutalism-xs transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="New Password"
                        />
                      </div>

                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="re_new_password"
                          value={re_new_password}
                          onChange={(e) => onChange(e)}
                          required
                          className="text-md duration block w-full border focus:ring-none focus:outline-none border-dark py-3 pl-10 font-medium shadow-neubrutalism-xs transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="Repeat New Password"
                        />
                      </div>

                      <div className="mt-2 flex">
                        <input
                          className="form-checkbox h-4 w-4  text-black transition duration-150 ease-in-out"
                          type="checkbox"
                          id="show-password"
                          onChange={toggleShowPassword}
                        />
                        <label
                          className="ml-2 flex text-sm leading-5 text-gray-900 focus-within:text-blue-800"
                          htmlFor="show-password"
                        >
                          {showPassword ? (
                            <span className="inline-flex text-gray-900 dark:text-dark-txt">
                              Hide password
                            </span>
                          ) : (
                            <span className="inline-flex text-gray-900 dark:text-dark-txt">
                              Show password
                            </span>
                          )}
                        </label>
                      </div>

                      <div>
                        {loading ? (
                          <Button type="button">
                            <CircleLoader loading={loading} size={25} color="#1c1d1f" />
                          </Button>
                        ) : (
                          <Button type="submit">Change Password</Button>
                        )}
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-sm">
                          <span className="text-md font-base text-gray-900 dark:text-dark-txt">
                            or{' '}
                          </span>
                          <button
                            onClick={() => {
                              setOpenLogin(true);
                              setOpen(false);
                            }}
                            className="text-lg font-medium text-blue-500 dark:text-dark-accent hover:text-blue-600"
                          >
                            Login to your account
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ForgotPasswordConfirmModal;
