import { Category } from '@/interfaces/Category';
import { ICourseList } from '@/interfaces/courses/CoursesList';
import Categories from '../../components/Categories';
import CourseSearch from '../../components/CourseSearch';
import CoursesList from '@/components/courses/CoursesList';

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/category/list/parent/`, {
    cache: 'no-store',
  });
  const data = await res.json();
  const categories: Category[] = data.results;

  const coursesRes = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/list/by_category/?p=1&page_size=12&max_page_size=100&category=${params?.slug}`,
    {
      cache: 'no-store',
    },
  );
  const courseData = await coursesRes.json();
  const courses: ICourseList[] = courseData.results;

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-7xl">{/* Content goes here */}</div>
      </div>
      <CoursesList courses={courses} />
      {/* <CourseSearch categories={categories} courses={courses} /> */}
    </div>
  );
}
