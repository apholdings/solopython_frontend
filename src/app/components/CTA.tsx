import Button from '@/components/Button';
import Link from 'next/link';

export default function CTA() {
  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-circular-medium tracking-tight text-blue-500 sm:text-5xl">
            Try SoloPython free for 14 days.
          </h2>
          <p className="mx-auto mt-6 max-w-4xl font-circular-book text-2xl leading-8 text-gray-500">
            Since we’re both serious about your business, let’s make it official.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/price">
              <Button className="py-4 px-8 text-xl">Start free trial</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
