import { ICourseList } from '@/interfaces/courses/CoursesList';
import moment from 'moment';
import Link from 'next/link';

interface PageProps {
  course: ICourseList;
}

export default function Card({ course }: PageProps) {
  return (
    <article
      key={course?.id}
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
    >
      <img
        src={course?.thumbnail}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        <time dateTime={course?.updated_at} className="mr-8">
          {moment(course?.updated_at).format('ll')}
        </time>
        <div className="-ml-4 flex items-center gap-x-4">
          <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
            <circle cx={1} cy={1} r={1} />
          </svg>
          <div className="flex gap-x-2.5">
            <img
              src={course?.author.picture}
              alt=""
              className="h-6 w-6 flex-none rounded-full bg-white/10"
            />
            {course?.author.username}
          </div>
        </div>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <Link href={`/watch/${course?.slug}`}>
          <span className="absolute inset-0" />
          {course?.title}
        </Link>
      </h3>
    </article>
  );
}
