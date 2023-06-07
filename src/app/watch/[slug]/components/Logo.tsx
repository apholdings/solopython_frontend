'use client';

import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      width={256}
      height={256}
      className="h-8 w-auto"
      src="/assets/img/logos/logo2.png"
      alt="Your Company"
    />
  );
}
