'use client';
import Link from 'next/link';

export default function ExploreButton() {
  return (
    <Link
      href="/courses"
      className="rounded-full bg-blue-500 px-4 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      Explorar Cursos
    </Link>
  );
}
