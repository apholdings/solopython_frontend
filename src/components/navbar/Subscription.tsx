'use client';

import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Subscription() {
  return (
    <Link
      href="/profile/subscriptions/"
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
      <CheckBadgeIcon className="h-6 w-auto text-gray-400" />
    </Link>
  );
}
