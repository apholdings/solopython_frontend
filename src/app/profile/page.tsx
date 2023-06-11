'use client';

import Header from './components/Header';
import Container from './components/Container';
// import { authOptions } from '../api/auth/[...nextauth]/route';
// import { getServerSession } from 'next-auth';

export default function Page() {
  // const session = getServerSession(authOptions)
  // // const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/`);

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-7xl">
          {/* Content goes here */}
          <Container />
        </div>
      </div>
    </>
  );
}
