import React from 'react';
import {
  AcademicCapIcon,
  ChatBubbleBottomCenterIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import DOMPurify from 'isomorphic-dompurify';

function InstructorDetails({ data, profile }) {
  const sanitizedProfileInfo = DOMPurify.sanitize(profile?.profile_info);
  return (
    <div>
      {data ? (
        <div className="mx-auto max-w-3xl py-4  lg:max-w-7xl ">
          <div className="flex items-center justify-between space-x-4">
            <h2 className="mb-4 text-2xl font-black text-gray-900 dark:text-dark-txt">Seller</h2>
          </div>

          <div className="mx-auto max-w-7xl ">
            <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
              <div className="lg:col-span-2">
                <ul className="space-y-12 sm:-mt-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 lg:gap-x-8 lg:space-y-0">
                  <li className="sm:py-8">
                    <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                      <div className="aspect-w-3 aspect-h-3">
                        <img
                          className="rounded-full object-cover shadow-lg"
                          src={data?.picture}
                          alt=""
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <div className="space-y-4">
                          <div className="space-y-1 text-lg font-medium leading-6">
                            <h3 className="dark:text-dark-txt">{data?.username}</h3>
                            <p className="text-indigo-600">Instructor</p>
                          </div>

                          <div className="grid grid-rows-4 ">
                            <div className="font-regular inline-flex text-sm text-gray-600 dark:text-dark-txt">
                              <StarIcon className=" inline-flex h-4 w-4 text-gray-600 dark:text-dark-txt" />
                              <span className="ml-4">{data?.student_rating} Ratings</span>
                            </div>
                            <div className="font-regular my-0.5 inline-flex text-sm text-gray-600 dark:text-dark-txt">
                              <ChatBubbleBottomCenterIcon className=" inline-flex h-4 w-4 text-gray-600 dark:text-dark-txt" />
                              <span className="ml-4">{data?.student_rating_no} Reviews</span>
                            </div>
                            <div className="font-regular my-0.5 inline-flex text-sm text-gray-600 dark:text-dark-txt">
                              <UserGroupIcon className=" inline-flex h-4 w-4 text-gray-600 dark:text-dark-txt" />
                              <span className="ml-4">{data?.students} Students</span>
                            </div>
                            <div className="font-regular inline-flex text-sm text-gray-600 dark:text-dark-txt">
                              <AcademicCapIcon className=" inline-flex h-4 w-4 text-gray-600 dark:text-dark-txt" />
                              <span className="ml-4">{data?.courses} Courses</span>
                            </div>
                            {/* <div className="font-regular inline-flex text-sm text-gray-600 dark:text-dark-txt">
                                                    <ShoppingBagIcon className=" inline-flex h-4 w-4 text-gray-600 dark:text-dark-txt"/>
                                                    <span className="ml-4">9 Products</span>
                                                </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-md font-base text-gray-900 dark:text-dark-txt">
              {sanitizedProfileInfo}
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default InstructorDetails;
