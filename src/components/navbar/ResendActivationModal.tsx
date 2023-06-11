'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CircleLoader from 'react-spinners/CircleLoader';
import { EnvelopeIcon } from '@heroicons/react/20/solid';
import Button from '../Button';

interface ResendActivationModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenLogin: (value: boolean) => void;
}

const ResendActivationModal: React.FC<ResendActivationModalProps> = ({
  open,
  setOpen,
  setOpenLogin,
}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    e.preventDefault();
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
                  <p className="mb-6 pt-8 text-center text-xl font-circular-bold dark:text-dark-txt">
                    Resend Activation Email
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
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => onChange(e)}
                          required
                          className="text-md duration block w-full border focus:ring-none focus:outline-none border-dark py-3 pl-10 font-medium shadow-neubrutalism-xs transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        {loading ? (
                          <Button className="w-full" type="button">
                            <CircleLoader loading={loading} size={25} color="#1c1d1f" />
                          </Button>
                        ) : (
                          <Button className="w-full" type="submit">
                            Send Email
                          </Button>
                        )}
                      </div>
                    </form>

                    <div className="mt-4 flex items-center justify-center">
                      <div className="text-sm">
                        <span className="text-md font-base text-gray-900 dark:text-dark-txt">
                          or{' '}
                        </span>
                        <button
                          onClick={() => {
                            setOpenLogin(true);
                            setOpen(false);
                          }}
                          className="text-md font-circular-book font-dark-accent hover:text-blue-600"
                        >
                          Login
                        </button>
                      </div>
                    </div>
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

export default ResendActivationModal;
