'use client';

import { Tab } from '@headlessui/react';
import ContentList from './ContentList';
import { ICourseDetail } from '@/interfaces/courses/CourseDetail';
import CourseContentSec from './CourseContentSec';
import InstructorDetails from './InstructorDetails';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface ContentTabsProps {
  course: ICourseDetail;
}

export default function ContentTabs({ course }: ContentTabsProps) {
  return (
    <div className="w-full max-w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className=" mt-8  grid space-x-1 space-y-1 rounded-xl p-1 sm:flex sm:space-x-2 sm:space-y-0">
          <Tab
            className={({ selected }) =>
              classNames(
                'col-span-1 w-full py-2.5 text-lg leading-5 md:col-span-2',
                '',
                selected
                  ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-bold text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                  : 'flex items-center justify-center border-b-2 border-gray-50 p-1 font-semibold text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
              )
            }
          >
            Curriculum
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'col-span-1 w-full py-2.5 text-lg leading-5 md:col-span-2',
                '',
                selected
                  ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-bold text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                  : 'flex items-center justify-center border-b-2 border-gray-50 p-1 font-semibold text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
              )
            }
          >
            Instructor
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'col-span-1 w-full py-2.5 text-lg leading-5 md:col-span-2',
                '',
                selected
                  ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-bold text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                  : 'flex items-center justify-center border-b-2 border-gray-50 p-1 font-semibold text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
              )
            }
          >
            Reviews
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
              <div className="mx-auto max-w-7xl py-6">
                {/* Content goes here */}
                <div className="border-b border-gray-200 pb-5">
                  <h2 className="mb-2 text-2xl font-black text-gray-800 dark:text-dark-txt md:text-3xl">
                    Course Content
                  </h2>

                  <ul className="flex w-full text-xs font-medium dark:text-dark-txt-secondary md:text-sm">
                    <li className="mr-1 inline-block ">{course?.sections.length} sections</li>
                    <li className="mr-1  inline-block">• {course?.total_lectures} lectures</li>
                    <li className="mr-1  inline-block">
                      • {course?.total_duration} h total length
                    </li>
                  </ul>
                </div>
                <div className="my-4 dark:text-dark-txt">
                  {
                    // eslint-disable-next-line
                    course?.sections ? (
                      course.sections.map((section) => (
                        <CourseContentSec section={section} key={section.id} />
                      ))
                    ) : (
                      <div />
                    )
                  }
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
              <div className="mx-auto max-w-3xl">
                {/* Content goes here */}
                <InstructorDetails data={course?.author} />
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
              <div className="mx-auto max-w-3xl">
                {/* Content goes here */}
                Reviews
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
