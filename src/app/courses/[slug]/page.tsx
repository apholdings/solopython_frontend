import { ICourseDetail } from '@/interfaces/courses/CourseDetail';
import Link from 'next/link';
import ContentTabs from './components/ContentTabs';
import TopBar from './components/Topbar';
import {
  CheckBadgeIcon,
  ChevronUpIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  ReceiptRefundIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import moment from 'moment';

import { BookOpenIcon, IdentificationIcon, PlayIcon } from '@heroicons/react/24/outline';
import FullDetails from './components/FullDetails';
import AddToCart from './components/AddToCart';

import CTATabs from './components/CTATabs';
import { useContext } from 'react';
import CouponContext from '@/context/couponContext';
import CoursePrice from './components/CoursePrice';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface PageProps {
  params: {
    slug: String;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/get/${slug}/`, {
    cache: 'no-store',
  });
  const data = await res.json();
  const course: ICourseDetail = data.results;

  const whatLearntSlice: string[] = [];

  if (course && course.what_learnt && course.what_learnt.length >= 4) {
    [whatLearntSlice[0], whatLearntSlice[1], whatLearntSlice[2], whatLearntSlice[3]] =
      course.what_learnt.slice(0, 4);
  }

  return (
    <div>
      {/* <TopBar course={course} /> */}
      <div className=" bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-12">
          {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
          <div className="mx-auto max-w-5xl flex flex-wrap md:flex-nowrap">
            <div className="md:w-7/12 md:pr-4">
              <div>
                {/* Title and short description at the top */}
                <p className="text-xl font-bold dark:text-dark-txt sm:text-2xl sm:tracking-tight lg:text-3xl">
                  {course?.title}
                </p>
                {/* Description */}
                <div className="text-md font-regular mt-2  lg:text-lg">
                  {course?.short_description}
                </div>
                {/* Ratings */}
                <div className="mb-2 mt-4">
                  {
                    // eslint-disable-next-line
                    course?.best_seller ? (
                      <span className=" mr-2 inline-flex items-center justify-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-bold text-yellow-800">
                        Best Seller
                      </span>
                    ) : (
                      <div />
                    )
                  }
                  <div className="inline-flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          course?.student_rating > rating ? 'text-yellow-600' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0',
                        )}
                        aria-hidden="true"
                      />
                    ))}
                    <span className="text-md mt-1 ml-2  font-regular dark:text-dark-accent text-blue-400">
                      ({course?.student_rating_no} ratings){' '}
                      <span className="text-md ml-2 font-medium text-gray-700">
                        {course?.students} Students
                      </span>
                    </span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex ">
                  <div>
                    <div className=" text-sm font-medium  ">
                      Created by:{' '}
                      <span className="font-bold dark:text-dark-accent dark:hover:text-dark-primary text-iris-400 underline">
                        <Link href={`/@/${course?.author.username}`}>
                          {course?.author.username}
                        </Link>
                        {course?.author.verified ? (
                          <CheckBadgeIcon
                            className="ml-1 inline-flex h-4 w-4 dark:text-dark-accent  text-iris-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <div />
                        )}
                      </span>
                    </div>
                    {/* <p className="mt-2 text-sm font-medium dark:text-dark-txt  ">
                      Token ID:{' '}
                      <span className="font-regular text-xs dark:text-dark-accent  text-iris-400">
                        {course?.token_id}
                      </span>
                    </p>
                    <p className="mt-2 text-sm font-medium dark:text-dark-txt  ">
                      NFT Address:{' '}
                      <span className="font-regular text-xs dark:text-dark-accent  text-iris-400">
                        <Link
                          target="_blank"
                          rel="noreferrer"
                          href={`https://mumbai.polygonscan.com/address/${course?.nft_address}`}
                        >
                          {course?.nft_address}
                        </Link>
                      </span>
                    </p> */}

                    <span className="mt-1 block" />
                  </div>
                </div>

                {/* Details */}
                <div className="mt-1 flex gap-x-4">
                  <div>
                    <InformationCircleIcon className="mr-2 inline-flex h-5 w-5  dark:text-dark-txt " />
                    <span className="text-xs font-medium  dark:text-dark-txt sm:text-sm">
                      <span>Updated </span>
                      {moment(course?.updated_at).format('MMMM YYYY')}
                    </span>
                  </div>
                  <div>
                    <GlobeAltIcon className="mr-2 inline-flex h-5 w-5  dark:text-dark-txt" />
                    <span className="font-regular text-xs  dark:text-dark-txt sm:text-sm">
                      {course?.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-5/12 mt-4 md:mt-0">
              <video
                className="w-full h-64"
                src={course?.videos[0].file}
                poster={course?.images[0].file}
                controls
              />
              <div className="mt-2">
                <CoursePrice course={course} />
              </div>
              {/* <div className="grid grid-cols-12 space-x-2 mr-2"> */}
              <AddToCart course={course} />
              {/* </div> */}
              <button className="border border-yellow-500 hover:border-yellow-300 w-full mt-2 hover:bg-yellow-200 text-yellow-500 hover:text-yellow-800 font-bold py-2 px-4 rounded ">
                Buy Now
              </button>

              <CTATabs course={course} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-5xl">
          {/* Content goes here */}

          <div className="mt-4 flex-auto md:space-x-1 py-2 md:grid md:grid-cols-3 ">
            <div className="border border-gray-400 p-4 dark:border-dark-third">
              <dt>
                <div className="flex h-8 w-8 items-center justify-center rounded-full dark:bg-dark-txt bg-gray-700 text-white dark:text-dark-third">
                  <PlayIcon className="h-5 ml-0.5 w-auto" aria-hidden="true" />
                </div>
                <p className="mt-12 text-lg font-medium leading-6 text-gray-700" />
              </dt>
              <dd className="mt-2 text-xs font-black text-gray-900 dark:text-dark-txt-secondary">
                {course?.total_duration} hours of video
              </dd>
            </div>

            <div className="border border-gray-400 p-4 dark:border-dark-third">
              <dt>
                <div className="flex h-8 w-8 items-center justify-center text-gray-700  dark:text-dark-txt">
                  <BookOpenIcon className="h-8 w-8" aria-hidden="true" />
                </div>
                <p className="mt-12 text-lg font-medium leading-6 text-gray-700" />
              </dt>
              <dd className="mt-2 text-xs font-black text-gray-900 dark:text-dark-txt-secondary">
                {course?.total_lectures} articles + resources
              </dd>
            </div>

            {/* <div className="border border-gray-300 p-4">
                                            <dt>
                                            <div className="flex h-8 w-8 items-center justify-center text-gray-700">
                                                <CommandLineIcon className="h-8 w-8" aria-hidden="true" />
                                            </div>
                                            <p className="mt-12 text-lg font-medium leading-6 text-gray-700"></p>
                                            </dt>
                                            <dd className="mt-2 text-xs text-gray-900 font-bold">{sections.length} coding exercises</dd>
                                        </div> */}

            <div className="border border-gray-400 p-4 dark:border-dark-third">
              <dt>
                <div className="flex h-8 w-8 items-center justify-center text-gray-900  dark:text-dark-txt ">
                  <IdentificationIcon className="h-8 w-8" aria-hidden="true" />
                </div>
                <p className="mt-12 text-lg font-medium leading-6 text-gray-900" />
              </dt>
              <dd className="mt-2 text-xs font-black text-gray-900 dark:text-dark-txt-secondary">
                certificate of completion
              </dd>
            </div>
          </div>

          <div className="mx-auto max-w-7xl border border-gray-300 p-4 dark:border-dark-third">
            <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-dark-txt">
              Access to More Courses for Less
            </h2>

            <div className=" pb-2 sm:flex sm:items-center sm:justify-between">
              <p className="font-regular text-sm tracking-tight text-gray-900 dark:text-dark-txt">
                You may access this course if you subscribe to any of these.
              </p>
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <Link
                  href={`/@/${course?.author.username}`}
                  className=" inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium dark:text-dark-accent hover:dark:text-dark-primary text-purple-700 underline underline-offset-4 "
                >
                  Subscribe
                </Link>
              </div>
            </div>

            <div className="mt-4 flow-root ">
              <div className="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
                <div className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                  <span className="bg-green-100 text-green-800 inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium">
                    Tier 1
                  </span>
                </div>
              </div>
            </div>
          </div>
          <FullDetails course={course} />
          <ContentTabs course={course} />
        </div>
      </div>
    </div>
  );
}
