'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <div className="flex lg:flex-1">
      <Link href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">SoloPython</span>
        <Image
          alt="logo"
          className="h-10 w-auto"
          width={100}
          height={100}
          src="/assets/img/logos/logo.png"
        />{' '}
      </Link>
    </div>
  );
}
