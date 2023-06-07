'use client';

import WhatLearntItem from './WhatLearntItem';

export default function WhatLearnt({ whatlearnt }) {
  return (
    <div className="mx-auto mb-8 max-w-7xl border px-4 dark:border-dark-third sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-3xl">
        <div>
          {whatlearnt ? (
            <h2 className="font-gilroy-black my-4 text-lg dark:text-dark-txt md:text-xl lg:text-2xl">
              What you&apos;ll learn
            </h2>
          ) : (
            <div />
          )}
          <ul className=" grid md:grid-cols-2">
            {
              // eslint-disable-next-line
              whatlearnt ? (
                whatlearnt.map((whatlearnt, index) => (
                  <li key={whatlearnt.id} className="py-2">
                    <WhatLearntItem data={whatlearnt} msg={whatlearnt.title} />
                  </li>
                ))
              ) : (
                <></>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
