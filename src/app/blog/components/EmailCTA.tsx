'use client';

import { CpuChipIcon, EnvelopeIcon } from '@heroicons/react/20/solid';
import EmailForm from './EmailForm';

export default function EmailCTA() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl lg:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 bg-pink-200 m-2 rounded p-8">
            <CpuChipIcon className="h-6 w-auto text-white mb-4" />
            <h3 className="text-2xl lg:text-4xl font-circular-bold ">
              Create your course in minutes with our free AI tools
            </h3>
            <p className="mt-4 text-md font-circular-light text-lg ">
              Build your business the easy way with free AI tools that can structure your course,
              create lessons, and build marketing campaigns — so you can be up and selling in no
              time.
            </p>
            <button
              className="px-8 mt-8 py-3 bg-black text-white font-circular-bold text-lg rounded-xl my-2"
              type="submit"
            >
              Learn more
            </button>
          </div>
          <div className="col-span-5 bg-blue-500 m-2 rounded p-6">
            <EnvelopeIcon className="h-6 w-auto text-white mb-4" />
            <h3 className="text-2xl font-semibold leading-6 text-white">Stay in the loop</h3>
            <p className="mt-4 text-md font-circular-light text-lg text-gray-100">
              Get free expert insights and tips to grow your knowledge business sent right to your
              inbox.{' '}
            </p>
            <EmailForm />
            <p className="text-xs font-circular-light text-white leading-normal mt-2">
              By submitting you agree to receive our monthly Knowledge Economy Newsletter as well as
              other promotional emails from Kajabi. You may withdraw your consent at any time via
              the “Unsubscribe” link in any email or view our privacy policy at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
