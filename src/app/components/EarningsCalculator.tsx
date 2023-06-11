'use client';

import Button from '@/components/Button';

export default function EarningsCalculator() {
  return (
    <div className="bg-blue-400 bg-opacity-10 py-24 mt-20 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 space-x-3 flex items-center">
          <h2 className="justify-left  flex text-4xl lg:text-5xl font-circular-bold">
            Turn your knowledge
          </h2>
          <h2 className="justify-left text-blue-500 flex text-4xl lg:text-5xl font-circular-bold">
            into income
          </h2>
        </div>
        <div className="mb-12">
          <h2 className="justify-left flex text-2xl lg:text-3xl font-circular-medium">
            How many skills do you have?
          </h2>
          <p className="justify-left flex text-md lg:text-lg font-circular-book">
            No skills yet? Just estimate. Inside SoloPython, we’ll show you proven ways to grow your
            skills.
          </p>
          <div>Slider here</div>
        </div>
        <div className="mb-12">
          <h2 className="justify-left flex text-2xl lg:text-3xl font-circular-medium">
            What will you charge for your services?
          </h2>
          <p className="justify-left flex text-md lg:text-lg font-circular-book">
            Create a portfolio, online presence, gather a team, or learn sales (SoloPython helps you
            complete them all)!
          </p>
          <div>Slider here</div>
        </div>
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="">
              <h3 className="text-lg text-blue-500 font-circular-medium leading-6 ">
                Annual Income
              </h3>
              <h3 className="text-6xl mt-6 text-blue-500 font-circular-medium leading-6 ">$ 0</h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <Button>Start free trial</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
