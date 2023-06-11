'use client';

import { Fragment, useEffect, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { signOut, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import Loginmodal from './LoginModal';
import Registermodal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResendActivationModal from './ResendActivationModal';
import Link from 'next/link';

import slugify from 'react-slugify';
import ShoppingCart from './ShoppingCart';
import Wallet from './Wallet';
import DarkModeButton from '@/app/watch/[slug]/components/DarkModeButton';
import ForgotPasswordConfirmModal from './ForgotPasswordConfirmModal';
import Subscription from './Subscription';
import { ISubscription } from '@/interfaces/tiers/Subscription';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface AuthenticationProps {
  openLogin: boolean;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Authentication({ openLogin, setOpenLogin }: AuthenticationProps) {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [openRegister, setOpenRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openForgotPasswordConfirm, setOpenForgotPasswordConfirm] = useState(false);
  const [openResendActivation, setOpenResendActivation] = useState(false);

  useEffect(() => {
    if (searchParams.get('login')) {
      setOpenLogin(true);
    }
    if (searchParams.get('signup')) {
      setOpenRegister(true);
    }
    if (searchParams.get('forgot_password_confirm')) {
      setOpenForgotPasswordConfirm(true);
    }
  }, [searchParams]);

  return (
    <div className="hidden lg:flex flex-1 items-center justify-end gap-x-2">
      {/* {session?.user && <Wallet />} */}
      {session?.user && <ShoppingCart />}

      {session?.user ? (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="items-center inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 hover:bg-gray-50">
              <Bars3Icon className="h-5 w-auto text-gray-400" />
              <span className="inline-block h-7 w-auto overflow-hidden rounded-full bg-gray-100">
                {session && session.user ? (
                  <img className="h-full w-full object-full" src={session.user.image} alt="" />
                ) : (
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {session && session.user ? (
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={`/profile`}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left font-circular-book',
                        )}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={`/library`}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left font-circular-book',
                        )}
                      >
                        Library
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          signOut();
                        }}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left font-circular-book',
                        )}
                      >
                        Log out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            ) : (
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setOpenLogin(true);
                        }}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left',
                        )}
                      >
                        Login
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setOpenRegister(true);
                        }}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left',
                        )}
                      >
                        Sign up
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            )}
          </Transition>
        </Menu>
      ) : (
        <div className="space-x-10">
          <button
            type="button"
            onClick={() => {
              setOpenRegister(true);
            }}
            className="rounded-lg scale-100 hover:scale-105 transition duration-300 ease-in-out bg-blue-500 px-6 py-2 text-md font-circular-bold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Start for free
          </button>
        </div>
      )}

      <Loginmodal
        open={openLogin}
        setOpen={setOpenLogin}
        setOpenForgotPassword={setOpenForgotPassword}
        setOpenRegister={setOpenRegister}
      />
      <Registermodal
        open={openRegister}
        setOpenLogin={setOpenLogin}
        setOpen={setOpenRegister}
        setOpenResendActivation={setOpenResendActivation}
      />
      <ForgotPasswordModal
        open={openForgotPassword}
        setOpen={setOpenForgotPassword}
        setOpenLogin={setOpenLogin}
      />
      <ForgotPasswordConfirmModal
        open={openForgotPasswordConfirm}
        setOpen={setOpenForgotPasswordConfirm}
        setOpenLogin={setOpenLogin}
      />
      <ResendActivationModal
        open={openResendActivation}
        setOpen={setOpenResendActivation}
        setOpenLogin={setOpenLogin}
      />
    </div>
  );
}
