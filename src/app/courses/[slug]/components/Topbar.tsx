'use client';

import { ICourseDetail } from '@/interfaces/courses/CourseDetail';
import { StarIcon } from '@heroicons/react/20/solid';

import { useEffect } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  course: ICourseDetail;
}

export default function TopBar({ course }: Props) {
  function scrollFunction() {
    if (document.getElementById('navbar')) {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('navbar').classList.remove('hidden');
      } else {
        document.getElementById('navbar').classList.add('hidden');
      }
    }

    if (document.getElementById('navbar')) {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById('navbar').style.top = '0';
      } else {
        document.getElementById('navbar').style.top = '-100px';
      }
    }

    if (document.getElementById('above-fold-video')) {
      if (document.body.scrollTop > 320 || document.documentElement.scrollTop > 320) {
        document.getElementById('above-fold-video').classList.add('hidden');
      } else {
        document.getElementById('above-fold-video').classList.remove('hidden');
      }
    }

    if (document.getElementById('below-fold-video')) {
      if (
        document.body.scrollTop > 320 ||
        (document.documentElement.scrollTop > 320 && document.body.clientWidth > 1239)
      ) {
        document.getElementById('below-fold-video').classList.remove('hidden');
      } else {
        document.getElementById('below-fold-video').classList.add('hidden');
      }
    }
  }

  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };
  }, []);

  return (
    <div
      id="navbar"
      className="fixed top-0 z-40 hidden w-full dark:bg-dark-main bg-black bg-cover bg-center py-1.5 shadow-neubrutalism-sm "
    >
      <div>
        <div className="py-3">
          <div className="ml-5 text-lg font-bold leading-6 text-white">
            {course && course.title}
            <div className="float-right flex xl:hidden">
              {/* Price */}
              <div className="flex px-4 text-white">
                <div className="mr-4 text-base flex-shrink-0 self-end">X MATIC</div>
                <div className="mr-4 text-base flex-shrink-0 self-end">Stock {course?.stock}</div>
              </div>
            </div>
          </div>
          {
            // eslint-disable-next-line
            course && course.best_seller ? (
              <span className="mr-2 ml-4 inline-flex items-center rounded-full bg-almond-100 px-2.5 py-0.5 text-xs font-bold text-almond-800">
                Best seller
              </span>
            ) : (
              <div />
            )
          }
          <span className={`${course && course.best_seller ? '' : 'ml-4'} mr-2 inline-flex`}>
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  course?.student_rating > rating ? 'text-almond-600' : 'text-gray-200',
                  'h-5 w-5 flex-shrink-0',
                )}
                aria-hidden="true"
              />
            ))}
          </span>
          <span className="text-sm text-purple-300">
            ({course && course.student_rating_no} ratings)
          </span>
          <span className="ml-2 text-sm font-medium text-dark hidden sm:inline-flex">
            {course && course.students} Students
          </span>
        </div>
        {/* <div className="px-4 -mt-1 block lg:hidden">
            <Button>Buy Now</Button>
          </div> */}
      </div>
    </div>
  );
}
