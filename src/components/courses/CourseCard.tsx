import { ICourseList } from '@/interfaces/courses/CoursesList';
import moment from 'moment';
import slugify from 'react-slugify';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface CourseCardProps {
  course: ICourseList;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article key={course?.id} className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <img
          src={course?.thumbnail}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={course?.updated_at} className="text-gray-500">
            {moment(course?.updated_at).fromNow()}
          </time>
          <div className="hidden md:flex">
            <h3 className="flex space-x-2 items-center">
              <span className="text-md inline-flex font-semibold text-almond-600">
                {course?.student_rating}
              </span>
              <div className="ml-1 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      course?.student_rating > rating ? 'text-yellow-500' : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0',
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="inline-flex text-xs dark:text-dark-txt-secondary text-gray-400">
                ({course?.student_rating_no})
              </span>
            </h3>
          </div>
        </div>
        <div className="group relative mb-2">
          <div className="flex items-center mt-3">
            <h3 className=" text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <Link href={`/courses/${course?.slug}`}>
                <span className="absolute inset-0" />
                {course?.title}
              </Link>
            </h3>
            <span className="ml-2.5 inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              {course?.category}
            </span>
          </div>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {course?.short_description}
          </p>
        </div>
        {course?.price ? (
          <p className="text-base font-semibold inline-flex mr-2.5">$ {course.price}</p>
        ) : (
          <span className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10">
            Free
          </span>
        )}
      </div>
    </article>
  );
}
