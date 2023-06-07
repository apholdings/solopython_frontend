'use client';

import { WalletIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import Web3Context from '@/context/web3Context';

export default function Wallet() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const {
    web3,
    networkId,
    setWeb3,
    setNetworkId,
    nativeBalance,
    setNativeBalance,
    nativeToken,
    setNativeToken,
  } = useContext(Web3Context);

  const fetchUserBalance = useCallback(async () => {
    const address = session?.user?.address;
    if (web3 && address) {
      const balance = await web3.eth.getBalance(address);
      setNativeBalance(web3.utils.fromWei(balance, 'ether'));
    }
  }, [web3, session, networkId]);

  useEffect(() => {
    fetchUserBalance();
  }, [fetchUserBalance, networkId]);

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="
        rounded-full
        hover:bg-gray-50
        border
        border-gray-100
        py-2 px-3.5
        text-sm
        font-bold
        flex
        relative
        "
      >
        <WalletIcon className="h-6 w-auto text-gray-400" />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                            Your Wallet
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-none"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Your content */}
                        <div>
                          <div className="px-4 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                              ERC20 Wallet Address
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                              {session?.user?.address}
                            </p>
                          </div>
                          <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                              {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Private Key
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  secreto
                                </dd>
                              </div> */}
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Network
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  <select
                                    value={networkId}
                                    onChange={(event) => setNetworkId(event.target.value)}
                                    className="form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                  >
                                    <option value="1">Ethereum</option>
                                    <option value="137">Polygon</option>
                                  </select>
                                </dd>
                              </div>
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  {nativeToken}
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  {nativeBalance}
                                </dd>
                              </div>
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"></div>
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Send
                                  <div>approve</div>
                                </dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  <ul
                                    role="list"
                                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                                  >
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                      To
                                    </li>
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                      Amount
                                    </li>
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                      Token
                                    </li>
                                  </ul>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
