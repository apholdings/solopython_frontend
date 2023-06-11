'use client';

import {
  Bars3Icon,
  ShoppingCartIcon,
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import Loginmodal from './LoginModal';
import Registermodal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResendActivationModal from './ResendActivationModal';
import { signOut, useSession } from 'next-auth/react';
import slugify from 'react-slugify';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';

import { products, callsToAction, company, community } from '@/utils/navigation';
import ShoppingCart from './ShoppingCart';
import Wallet from './Wallet';
import Subscription from './Subscription';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Container({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openResendActivation, setOpenResendActivation] = useState(false);

  const { data: session } = useSession();

  return (
    <>
      <h1 className="bg-blue-500 w-full fixed top-0 z-40">Cursos de Programacion Python</h1>
      <div
        className="
         border-b border-gray-200 bg-white fixed top-1.5 w-full z-40 mx-auto flex max-w-full items-center justify-between gap-x-2 p-4 lg:px-20
        "
      >
        {children}
        <div className="flex lg:hidden space-x-2">
          {/* <Wallet /> */}
          <ShoppingCart />
          {/* <Subscription /> */}
          <button
            type="button"
            className="
        rounded-full
        hover:bg-gray-50
        border
        border-gray-100
        py-2 px-3.5
        text-sm
        font-bold
        flex
        text-gray-400
        "
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center gap-x-6">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">SoloPython</span>
                <Image
                  className="h-10 w-auto"
                  width={100}
                  height={100}
                  src="/assets/img/logos/logo2.png"
                  alt=""
                />
              </Link>
              {session && session.user ? (
                <div className="flex ml-auto items-center">
                  {/* <img className="h-8 w-auto" src={session.user.image} alt="" /> */}
                  <Link href={`/profile`} className="ml-2">
                    {session.user.email}
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setOpenRegister(true);
                  }}
                  className="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              )}
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Productos
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...products, ...callsToAction].map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Link
                    href="/store"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Tienda
                  </Link>
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Empresa
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...company].map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Comunidad
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {community.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
                <div className="py-6 space-y-2">
                  {session && session.user ? (
                    <Link
                      href={`/profile`}
                      className="-mx-3 text-left w-full block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setOpenLogin(true);
                      }}
                      className="-mx-3 text-left w-full block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </button>
                  )}
                  {session && session.user ? (
                    <button
                      onClick={() => {
                        signOut();
                      }}
                      className="-mx-3 text-left w-full block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log Out
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setOpenRegister(true);
                      }}
                      className="-mx-3 text-left w-full block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
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
      <ResendActivationModal
        open={openResendActivation}
        setOpen={setOpenResendActivation}
        setOpenLogin={setOpenLogin}
      />
    </>
  );
}
