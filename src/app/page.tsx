import { ICourseList } from '@/interfaces/courses/CoursesList';
import CTA from './components/CTA';
import Categories from './components/Categories';
import CourseSearch from './components/CourseSearch';
import Feature1 from './components/Feature1';
import Feature2 from './components/Feature2';
import Feature3 from './components/Feature3';
import Header from './components/Header';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import { Category } from '@/interfaces/Category';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EarningsCalculator from './components/EarningsCalculator';
import TestimonialsLeftToRight from './components/TestimonialsLeftToRight';
import Resources from './components/Resources';

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/category/list/parent/`, {
    cache: 'no-store',
  });
  const data = await res.json();
  const categories: Category[] = data.results;

  const coursesRes = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/list/?p=1&page_size=12&max_page_size=100`,
    {
      cache: 'no-store',
    },
  );
  const courseData = await coursesRes.json();
  const courses: ICourseList[] = courseData.results;

  return (
    <main>
      <Navbar />
      <Header />
      <Stats />
      {/* <CourseSearch categories={categories} courses={courses} /> */}
      <Feature1 />
      <Feature2 />
      <Feature3 />
      <EarningsCalculator />
      <Testimonials />
      <TestimonialsLeftToRight />
      <Resources />
      <CTA />
      <Footer />
    </main>
  );
}
