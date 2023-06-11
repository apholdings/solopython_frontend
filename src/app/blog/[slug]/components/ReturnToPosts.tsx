'use client';

import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

export default function ReturnToPosts() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="flex items-center font-circular-bold text-lg text-blue-500"
    >
      <ArrowLeftIcon className="h-5 w-auto mr-1" />
      Back to all posts
    </button>
  );
}
