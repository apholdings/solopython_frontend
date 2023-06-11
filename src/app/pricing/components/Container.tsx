'use client';

import { ITier } from '@/interfaces/tiers/Tier';

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import AddToCart from './AddToCart';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface ContainerProps {
  tiers: ITier[];
}

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annual (Save 20%)', priceSuffix: '/year' },
];

export default function Container({ tiers }: ContainerProps) {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mt-2 text-4xl font-circular-medium tracking-tight text-gray-900 sm:text-7xl">
            Pricing plans that{' '}
            <span className="text-blue-500 font-circular-medium">grow with you</span>
          </p>
        </div>
        <p className="mx-auto font-circular-light mt-6 max-w-2xl text-center text-xl leading-8 text-gray-900">
          Choose a Kajabi plan that fits your budget and business goals.
        </p>
        <div className="mt-12 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded p-2 text-center text-lg font-circular-medium leading-5 ring-2 ring-inset ring-gray-900"
          >
            <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-black text-white' : 'text-gray-900',
                    'cursor-pointer rounded px-8 py-3',
                  )
                }
              >
                <span className="font-circular-medium">{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers
            .sort((a, b) => a.index - b.index)
            .map((tier, index) => (
              <div
                key={tier?.id}
                className={classNames(
                  tier?.mostPopular ? ' ' : 'm-2',
                  'rounded-md p-8 xl:p-4 shadow-neubrutalism-xl ring-2 ring-gray-900 shadow-blue-100',
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier?.id}
                    className={classNames(
                      tier?.mostPopular ? 'text-blue-500' : 'text-gray-900',
                      'text-lg font-circular-medium leading-8',
                    )}
                  >
                    {tier?.title}
                  </h3>
                  {tier?.mostPopular ? (
                    <p className="rounded-md bg-blue-500 px-4 py-0.5 text-sm font-circular-medium leading-5 text-white">
                      Most popular!
                    </p>
                  ) : null}
                </div>
                <p className="mt-2 flex items-baseline gap-x-1">
                  <span className="text-5xl font-circular-bold tracking-tight text-gray-900">
                    S/ {tier?.transaction_amount}
                  </span>
                  <span className="text-sm font-circular-medium leading-6 text-gray-600">
                    {frequency.priceSuffix}
                  </span>
                </p>
                <p className="my-6 mb-10 text-lg font-circular-light leading-6 text-gray-900">
                  {tier?.description}
                </p>

                <AddToCart tier={tier} />
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-900 xl:mt-10">
                  <h1 className="font-circular-bold text-lg">Features</h1>
                  {tier?.features?.map((feature) => (
                    <li
                      key={feature.id}
                      className={`flex text-lg text-gray-900 gap-x-3 ${
                        feature.highlight ? 'font-circular-bold' : 'font-circular-light'
                      }`}
                    >
                      <CheckCircleIcon
                        className="h-6 w-5 flex-none text-green-600"
                        aria-hidden="true"
                      />
                      {feature.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
