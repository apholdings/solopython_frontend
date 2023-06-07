'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

function RequisiteItem({ msg }) {
  return (
    <div className="my-2 flex md:my-0">
      <div className="mr-2 text-xl">
        <ExclamationCircleIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
      </div>
      <p>{msg}</p>
    </div>
  );
}

export default RequisiteItem;
