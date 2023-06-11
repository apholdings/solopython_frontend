'use client';

import { getSession, signIn } from 'next-auth/react';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CircleLoader from 'react-spinners/CircleLoader';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { synchCart } from '@/utils/api/synchCart';
import CartContext from '@/context/cartContext';
import Button from '../Button';

interface LoginmodalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenForgotPassword: (value: boolean) => void;
  setOpenRegister: (value: boolean) => void;
}

const Loginmodal: React.FC<LoginmodalProps> = ({
  open,
  setOpen,
  setOpenForgotPassword,
  setOpenRegister,
}) => {
  const { items, totalItems, setCartItems, setTotalItems } = useContext(CartContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Llamar a signIn para iniciar una sesión con las credenciales proporcionadas
    const res = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    // Get session after signing in
    const session = await getSession();

    if (!res?.error && session) {
      // Si la autenticación fue exitosa, cierra el modal
      setOpen(false);
      if (items.length > 0) {
        // Sincroniza los elementos del carrito con el servidor
        const synchRes = await synchCart(session, items);
        console.log(synchRes);

        // setCartItems(synchRes.cart);
        // setTotalItems(synchRes.total_items);
      }
    } else {
      // Aquí puedes manejar el error como mejor te parezca
      console.error(res.error);
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
                  <p className="mb-6 pt-8 text-center text-xl font-circular-bold dark:text-dark-txt">
                    Login to your account
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
                          className="text-md duration block w-full border rounded focus:ring-none focus:outline-none border-dark py-3 pl-10 font-circular-light transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={password}
                          onChange={(e) => onChange(e)}
                          required
                          className="text-md duration block w-full border rounded focus:ring-none focus:outline-none border-dark py-3 pl-10 font-circular-light transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="Password"
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
                          <Button type="button" className="w-full">
                            <CircleLoader loading={loading} size={25} color="#1c1d1f" />
                          </Button>
                        ) : (
                          <Button type="submit" className="w-full">
                            Login
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-sm">
                          <span className="text-md font-circular-bookt-dark-txt">or </span>
                          <button
                            onClick={() => {
                              setOpenForgotPassword(true);
                              setOpen(false);
                            }}
                            className="text-md font-circular-book font-dark-accent hover:text-blue-600"
                          >
                            Forgot your password?
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-sm">
                          <span className="text-md font-circular-bookdark-txt">
                            Don&apos;t have an account?{' '}
                          </span>
                          <button
                            onClick={() => {
                              setOpenRegister(true);
                              setOpen(false);
                            }}
                            className="underline text-lg font-circular-book font-dark-accent hover:text-blue-600"
                          >
                            Register
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

export default Loginmodal;
