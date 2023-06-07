'use client';

import Button from '@/components/Button';
import { ICourseDetail } from '@/interfaces/courses/CourseDetail';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';
import WhatLearnt from './WhatLearnt';
import Requisites from './Requisites';

interface Props {
  course: ICourseDetail;
}

export default function FullDetails({ course }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="mt-2">
        <Button onClick={() => setOpen(true)} type="button">
          Show full overview
        </Button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-dark-main sm:my-8 sm:max-w-3xl sm:p-6">
                  <div className=" pb-5">
                    <h3 className="text-lg font-bold leading-6 text-gray-900 dark:text-dark-txt">
                      Details and curriculum
                    </h3>
                  </div>
                  <WhatLearnt whatlearnt={course?.what_learnt} />

                  {/* Description */}
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className=" flex w-full justify-between border-y border-gray-300 px-4 py-2  text-left text-2xl font-black text-gray-900 dark:border-dark-third dark:text-dark-txt">
                          <span>Description</span>
                          <ChevronUpIcon
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } mt-1 h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 py-2 text-sm text-gray-500">
                          <div
                            className="text-md font-regular my-2 text-gray-900 dark:text-dark-txt"
                            dangerouslySetInnerHTML={{
                              __html: course?.description,
                            }}
                          />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {/* Requirements */}
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="mt-4 flex w-full justify-between border-y border-gray-300 px-4 py-2  text-left text-2xl font-black text-gray-900 dark:border-dark-third dark:text-dark-txt">
                          <span>Requirements</span>
                          <ChevronUpIcon
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } mt-1 h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 py-2 text-sm text-gray-500">
                          <Requisites requisites={course?.requisites} />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
