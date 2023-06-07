'use client';

import { CheckIcon } from '@heroicons/react/24/outline';

function WhatLearntItem({ msg }) {
  return (
    <div className="my-2 flex md:my-0">
      <div className="mr-2 text-sm ">
        <CheckIcon className="text-green-600 h-6 w-6" aria-hidden="true" />
      </div>
      <p className="font-gilroy-medium text-sm dark:text-dark-txt">{msg}</p>
    </div>
  );
}

export default WhatLearntItem;
