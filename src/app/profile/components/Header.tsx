'use clent';

import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { AcademicCapIcon, CheckCircleIcon, CommandLineIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  const profile = {
    name: session?.user?.name,
    email: session?.user?.email,
    avatar: session?.user?.image,
    backgroundImage: session?.user?.banner,
  };

  return (
    <div>
      <div>
        <img className="h-32 w-full object-cover lg:h-48" src={profile.backgroundImage} alt="" />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={profile.avatar}
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              {/* <CommandLineIcon className="h-5 w-auto text-gray-400" />
              <AcademicCapIcon className="h-5 w-auto text-gray-400" />
              <CheckCircleIcon className="h-5 w-auto text-gray-400" /> */}
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
        </div>
      </div>
    </div>
  );
}
