'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }

  return (
    <>
      <h1>Dashboard</h1>
      <p>You can view this page because you are signed in.</p>
    </>
  );
}
