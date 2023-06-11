import { ICourseList } from '@/interfaces/courses/CoursesList';
import CourseCard from './CourseCard';

interface CourseSearchProps {
  courses: ICourseList[];
}

export default function CoursesList({ courses }: CourseSearchProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
