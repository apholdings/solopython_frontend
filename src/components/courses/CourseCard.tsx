import { ICourseList } from '@/interfaces/courses/CoursesList';
import moment from 'moment';
import slugify from 'react-slugify';
import Link from 'next/link';

interface CourseCardProps {
  course: ICourseList;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article key={course?.id} className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <img
          src={course?.thumbnail || ''}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <a
            href={slugify(course?.category)}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {course?.category}
          </a>
          <time dateTime={course?.updated_at} className="text-gray-500">
            {moment(course?.updated_at).format('MMM Do YY')}
          </time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={`/courses/${course?.slug}`}>
              <span className="absolute inset-0" />
              {course?.title}
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {course?.short_description}
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          {course?.price ? (
            <p className="text-base font-semibold">$ {course.price}</p>
          ) : (
            <span className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10">
              Free
            </span>
          )}
          {course?.best_seller && (
            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/10">
              Best Seller
            </span>
          )}
          {/* <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-600 ring-1 ring-inset ring-rose-500/10">
            Discount
          </span> */}
        </div>
      </div>
    </article>
  );
}
