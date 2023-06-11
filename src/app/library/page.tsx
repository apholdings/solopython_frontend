import CoursesList from './components/CoursesList';
import { Category } from '@/interfaces/Category';
import SearchFilters from './components/SearchFilters';

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/category/list/parent/`, {
    cache: 'no-store',
  });
  const data = await res.json();
  const categories: Category[] = data.results;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-7xl">
        {/* Content goes here */}
        <div className="border-b border-gray-100 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="text-2xl font-semibold leading-6 text-gray-900">Library</h3>
              {/* <p className="mt-1 text-lg text-gray-500">
                Download our Academy Launcher now and gain seamless access to all your courses in
                one place.
              </p> */}
            </div>
            {/* <div className="ml-4 mt-4 flex-shrink-0">
              <button
                type="button"
                className="relative inline-flex items-center rounded-2xl border-gray-100 px-3 py-2 text-md font-semibold hover:bg-gray-50 text-black border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Download the App
              </button>
            </div> */}
          </div>
        </div>

        <CoursesList categories={categories} />
      </div>
    </div>
  );
}
