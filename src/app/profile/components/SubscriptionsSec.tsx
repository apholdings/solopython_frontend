'use client';

import { ISubscription } from '@/interfaces/tiers/Subscription';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Fragment, useCallback, useEffect, useState } from 'react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function SubscriptionSec() {
  const { data: session } = useSession();

  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);

  const fetchSubscriptions = useCallback(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${session?.user?.accessToken}`,
      },
    };
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/api/tiers/user_subscriptions/`,
      config,
    );
    setSubscriptions(res.data.results);
  }, [session?.user?.accessToken]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200">
        {subscriptions.map((subscription) => (
          <li key={subscription?.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={subscription?.tier.thumbnail}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <div className="hover:underline">{subscription?.tier.reason}</div>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  <div className="truncate hover:underline">{subscription?.tier.description}</div>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-6">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Next payment: {subscription?.next_payment_date}
                </p>
                {subscription?.status !== 'authorized' ? (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-gray-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Unactive</p>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Active</p>
                  </div>
                )}
              </div>
              <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm w-full text-left leading-6 text-gray-900',
                          )}
                        >
                          Pause
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm w-full text-left leading-6 text-gray-900',
                          )}
                        >
                          Cancel
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
