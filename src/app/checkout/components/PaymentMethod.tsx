'use client';

import React, { useContext, useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import PaymentMethodContext from '@/context/paymentMethodContext';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import Web3Context from '@/context/web3Context';
import CartContext from '@/context/cartContext';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ToastSuccess } from '@/components/toast/ToastSuccess';
import { useSession } from 'next-auth/react';
import CreditCardPayment from './CreditCardPayment';

const plans = [
  {
    name: 'Credit Card',
    image: '/assets/img/creditcard.png',
    value: 'credit',
  },
  {
    name: 'Polygon Network',
    image: '/assets/img/polygon.png',
    value: 'polygon',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PaymentMethod() {
  const { data: session } = useSession();

  const { setValue, setCardDetails } = useContext(PaymentMethodContext);
  const {
    web3,
    networkId,
    nativeBalance,
    nativeToken,
    setWeb3,
    setNetworkId,
    setNativeBalance,
    setNativeToken,
  } = useContext(Web3Context);

  const { maticCost } = useContext(CartContext);
  const [selected, setSelected] = useState(plans[0]);

  useEffect(() => {
    // This will run once after component mount and set the first item as the selected plan in context
    setValue(selected);
  }, []);

  const handleOnChange = (value) => {
    const selectedPlan = plans.find((plan) => plan.value === value);
    setSelected(selectedPlan);
    setValue(selectedPlan); // <- set the selected plan in the context
  };

  return (
    <>
      <RadioGroup value={selected.value} onChange={handleOnChange}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div className="space-y-4">
          {plans.map((plan, idx) => (
            <RadioGroup.Option
              key={idx}
              value={plan.value}
              className={({ checked, active }) =>
                classNames(
                  checked ? 'border-transparent' : 'border-gray-300',
                  active ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                  'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between',
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span className="flex items-center">
                    <span className="flex flex-col text-sm">
                      <RadioGroup.Label as="span" className="font-medium text-gray-900">
                        {plan.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className="text-gray-500"
                      ></RadioGroup.Description>
                    </span>
                  </span>
                  <RadioGroup.Description
                    as="span"
                    className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                  >
                    <img src={plan.image} className="h-5 w-auto" />
                  </RadioGroup.Description>
                  <span
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-indigo-600' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-lg',
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
          {selected.value === 'credit' && <div></div>}
          {selected.value === 'polygon' && (
            <div>
              <div className="my-4   ">
                <div className="  px-4  sm:px-6">
                  <div className=" flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className=" ">
                      <p className="mt-1 text-lg font-bold leading-6 dark:text-dark-txt text-gray-600">
                        Transaction Information
                      </p>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                      <span className="font-regular mr-2 inline-flex text-sm dark:text-dark-txt-secondary text-gray-500">
                        {nativeBalance > maticCost + 0.05
                          ? 'Sufficient funds'
                          : 'Insufficient funds'}
                      </span>
                      {nativeBalance > maticCost + 0.05 ? (
                        <CheckCircleIcon className="relative inline-flex h-5 w-5 text-green-300" />
                      ) : (
                        <XCircleIcon className="relative inline-flex h-5 w-5 text-rose-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Your wallet info */}
                <div className=" px-4  sm:px-6">
                  <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                      <p className="font-regular text-base leading-6 dark:text-dark-txt text-gray-900">
                        Your Wallet
                      </p>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                      <CopyToClipboard text={session?.user?.address}>
                        <button
                          type="button"
                          onClick={() => {
                            ToastSuccess('Copiado');
                          }}
                          className="relative inline-flex w-full cursor-pointer items-center py-2 text-sm font-medium dark:text-dark-txt-secondary text-gray-600"
                        >
                          {session?.user?.address}
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <div className=" px-4  sm:px-6">
                  <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                      <p className="font-regular text-base leading-6 dark:text-dark-txt text-gray-900">
                        Available MATIC
                      </p>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                      <div className="relative inline-flex cursor-pointer items-center dark:text-dark-txt-secondary py-2 text-sm font-medium text-gray-600">
                        {nativeBalance}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </RadioGroup>
    </>
  );
}
