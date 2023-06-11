'use client';

import { CheckCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function StatusBrick() {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">Order completed</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              Your order has been successfully processed and is now being prepared for delivery.
            </p>
          </div>
          <div className="mt-4">
            {/* <div className="-mx-2 -my-1.5 flex">
              <Link
                href="/dashboard/orders"
                className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                View order
              </Link>
              <Link
                href="/library"
                className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                Go to Library
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
