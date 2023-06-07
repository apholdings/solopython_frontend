'use client';

import RequisiteItem from './RequisiteItem';

export default function Requisites({ requisites }) {
  return (
    <div className="mx-auto mt-2 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-3xl dark:text-dark-txt">
        <div>
          <ul className="divide-y divide-gray-200">
            {
              // eslint-disable-next-line
              requisites ? (
                requisites.map((requisite, index) => (
                  <li key={requisite.id} className="py-2">
                    <RequisiteItem data={requisite} msg={requisite.title} />
                  </li>
                ))
              ) : (
                <div className="animate-pulse">
                  <div className="my-2 grid grid-cols-3">
                    <div className="h-4 rounded bg-gray-200" />
                    <div className="mx-2 h-4 rounded bg-gray-200" />
                    <div className="h-4 rounded bg-gray-200" />
                  </div>
                  <div className="my-4 flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="space-y-2">
                        <div className="h-4 rounded bg-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
