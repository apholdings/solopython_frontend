'use client';

import { ICourseDetail } from '@/interfaces/courses/CourseDetail';
import DOMPurify from 'isomorphic-dompurify';
import { useState } from 'react';

export default function OverviewPanel({ course }: { course: ICourseDetail }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="py-6">
        <h3 className="text-2xl font-black leading-6 dark:text-dark-txt text-gray-900">
          About this course
        </h3>
        <p className="text-md mt-2 max-w-2xl dark:text-dark-txt-secondary text-gray-500">
          {course?.title}
        </p>
      </div>
      <div className="mt-5 border-t dark:border-dark-second border-gray-200">
        <dl className="sm:divide-y dark:divide-dark-second sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-md font-medium dark:text-dark-txt text-gray-500">Statistics</dt>
            <dd className="text-md mt-1 dark:text-dark-txt text-gray-900 sm:mt-0">
              Skill level: {course?.level}
            </dd>
            <dd className="text-md mt-1 dark:text-dark-txt text-gray-900 sm:mt-0">
              Lectures:{' '}
              <span className="dark:text-dark-txt-secondary">{course?.total_lectures}</span>
            </dd>
            <dd className="text-md mt-1 text-gray-900 sm:mt-0" />
            <dd className="text-md mt-1 text-gray-900 dark:text-dark-txt sm:mt-0">
              Students: <span className="dark:text-dark-txt-secondary">{course?.students}</span>
            </dd>
            <dd className="text-md mt-1 dark:text-dark-txt text-gray-900 sm:mt-0">
              Video:{' '}
              <span className="dark:text-dark-txt-secondary">
                {course?.total_duration} total hours
              </span>
            </dd>
            <dd className="text-md mt-1 text-gray-900 sm:mt-0" />
            <dd className="text-md mt-1 text-gray-900 dark:text-dark-txt sm:mt-0">
              Languages:
              <span className="dark:text-dark-txt-secondary">{course?.language}</span>
            </dd>
            <dd className="text-md mt-1 text-gray-900 sm:mt-0" />
            <dd className="text-md mt-1 text-gray-900 sm:mt-0" />
            <dd className="text-md mt-1 text-gray-900 sm:mt-0 dark:text-dark-txt">
              Captions:{' '}
              <span className="dark:text-dark-txt-secondary">
                {course?.captions ? 'Yes' : 'No'}
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 ">
            <dt className="text-md font-medium dark:text-dark-txt text-gray-500">Certificates</dt>
            <dd className="text-md mt-1 text-gray-900 sm:mt-0 dark:text-dark-txt-secondary md:col-span-2">
              Get a certificate by completing the course
            </dd>
            <dd className="text-md mt-1 text-gray-900 sm:mt-0" />
            <dd className="text-md mt-1 text-gray-900 sm:mt-0  md:col-span-2">
              <button
                type="button"
                className="w-full cursor-not-allowed border border-gray-300 dark:border-dark-border py-2 px-12 text-gray-400"
              >
                Get certificate
              </button>
            </dd>
          </div>
          {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 ">
            <dt className="text-md font-medium text-gray-500">Features</dt>
            <dd className="text-md mt-1 text-gray-900 sm:mt-0  md:col-span-2">
              Available on{' '}
              <span className="border-b-2 border-purple-600 font-bold text-purple-600">iOS</span>{' '}
              and{' '}
              <span className="border-b-2 border-purple-600 font-bold text-purple-600">
                Android
              </span>
            </dd>
          </div> */}
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 ">
            <dt className="text-md font-medium dark:text-dark-txt text-gray-500">Description</dt>
            <dd className="text-md mt-1 text-gray-900 sm:mt-0  md:col-span-2">
              <div
                className="text-md font-regular prose text-gray-700 dark:text-dark-txt-secondary"
                dangerouslySetInnerHTML={{
                  __html: open
                    ? DOMPurify.sanitize(course?.description.slice(0, 299))
                    : DOMPurify.sanitize(course?.description),
                }}
              />
              {course?.description.length > 299 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (open) {
                      setOpen(false);
                    } else {
                      setOpen(true);
                    }
                  }}
                  className="mt-2 w-full border border-gray-900 py-3 text-gray-900 hover:bg-gray-50"
                >
                  {open ? <>Show less</> : <>Show more</>}
                </button>
              ) : (
                <div />
              )}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 ">
            <dt className="text-md font-medium dark:text-dark-txt text-gray-500">NFT Address</dt>
            <dd className="text-md mt-1 text-gray-900 sm:mt-0 dark:text-dark-txt-secondary md:col-span-2">
              <div className="flex">
                <p className="mt-1">{course?.nft_address}</p>
              </div>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 ">
            <dt className="text-md font-medium dark:text-dark-txt text-gray-500">Token ID</dt>
            <dd className="text-md mt-1 text-gray-900 sm:mt-0 dark:text-dark-txt-secondary md:col-span-2">
              <div className="flex">
                <p className="mt-1">{course?.token_id}</p>
              </div>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 ">
            <dt className="text-md font-medium dark:text-dark-txt text-gray-500">Instructors</dt>
            <dd className="text-md mt-1 text-gray-900 sm:mt-0 dark:text-dark-txt-secondary md:col-span-2">
              <div className="flex">
                {/* <div className="mr-4 flex-shrink-0">
                  <img
                    className="inline-block h-14 w-14 rounded-full"
                    src={course?.author.picture}
                    alt=""
                  />
                </div> */}
                <div>
                  <p className="text-md dark:text-dark-txt-secondary">{course?.author?.username}</p>
                  <p className="mt-1 dark:text-dark-txt-secondary">Profession</p>
                </div>
              </div>
              <p className="mt-12 dark:text-dark-txt-secondary">Profile info</p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
