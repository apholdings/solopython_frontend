'use client';

import { useSession } from 'next-auth/react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import StandardPagination from '@/components/pagination/StandardPagination';
import { useDebounce } from '@/hooks/DebounceHook';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import { Category } from '@/interfaces/Category';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const filters = {
  price: [
    { value: '0-25', label: '$0 - $25', checked: false },
    { value: '25-50', label: '$25 - $50', checked: false },
    { value: '50-75', label: '$50 - $75', checked: false },
    { value: '75-', label: '$75+', checked: false },
  ],
  language: [
    { value: 'español', label: 'Español', checked: false },
    { value: 'ingles', label: 'Ingles', checked: false },
  ],
  level: [
    { value: 'Beginner', label: 'Beginner', checked: false },
    { value: 'Intermediate', label: 'Intermediate', checked: true },
    { value: 'Advanced', label: 'Advanced', checked: false },
  ],
};

const sortOptions = [
  { value: 'sold', name: 'Most Popular', href: '#', current: true },
  { value: 'student_rating', name: 'Best Rating', href: '#', current: false },
  { value: 'created_at', name: 'Newest', href: '#', current: false },
];

interface PageProps {
  categories: Category[];
}

export default function CoursesList({ categories }: PageProps) {
  const { data: session } = useSession();

  const user = session?.user;

  const [courses, setCourses] = useState([]);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageSize, setMaxPageSize] = useState(100);

  const [searchBy, setSearchBy] = useState('');
  const debouncedSearchTerm = useDebounce(searchBy, 1000); // Un segundo de retraso

  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  function handleSortChange(option) {
    setSelectedSortingOption(option);
  }
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    language: [],
    level: [],
    category: [],
  });
  const [fetchedCourses, setFetchedCourses] = useState([]); // Guardar los cursos obtenidos del fetch

  function handleCheckboxChange(filterType, value) {
    setSelectedFilters((prevState) => {
      // copia el estado anterior
      const newState = { ...prevState };
      // si el filtro ya está en el estado, lo remueve, de lo contrario lo agrega
      if (newState[filterType].includes(value)) {
        newState[filterType] = newState[filterType].filter((filter) => filter !== value);
      } else {
        newState[filterType].push(value);
      }
      return newState;
    });
  }
  // Esta función devuelve el total de filtros seleccionados
  function countSelectedFilters() {
    return Object.values(selectedFilters).reduce(
      (total, filterArray) => total + filterArray.length,
      0,
    );
  }
  // Esta función establece todos los filtros a un estado no seleccionado
  function clearFilters() {
    setSelectedFilters({
      price: [],
      language: [],
      level: [],
      category: [],
    });
  }

  const fetchCourses = useCallback(async () => {
    if (!session?.user?.accessToken) {
      console.error('Access token not available');
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${session.user.accessToken}`,
      },
    };

    const params = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, values]) => {
      values.forEach((value) => {
        params.append(key, value);
      });
    });

    // Añade la opción de clasificación seleccionada a los parámetros de la solicitud
    if (selectedSortingOption) {
      params.append('sorting', selectedSortingOption);
    }

    if (searchBy) {
      params.append('search', searchBy);
    }

    params.append('p', String(currentPage));
    params.append('page_size', String(pageSize));
    params.append('max_page_size', String(maxPageSize));

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/list_paid/?${params.toString()}`,
        config,
      );
      setCourses(res.data.results);
      setCount(res.data.count);
    } catch (error) {
      console.error(`Error fetching courses: ${error.message}`);
    }
  }, [session, selectedFilters, selectedSortingOption]);

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user, fetchCourses, selectedFilters, selectedSortingOption]);

  return (
    <div>
      {/* Filters */}
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center border-b border-t border-gray-200"
      >
        <h2 id="filter-heading" className="sr-only">
          Filtros
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                <FunnelIcon
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                {countSelectedFilters()} Filtros
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <button onClick={clearFilters} type="button" className="text-gray-500">
                Clear all
              </button>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="border-t border-gray-200 py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block font-medium">Price</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.price.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`price-${optionIdx}`}
                        name="price[]"
                        value={option.value}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedFilters.price.includes(option.value)}
                        onChange={() => handleCheckboxChange('price', option.value)}
                      />
                      <label
                        htmlFor={`price-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="block font-medium">Language</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.language.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`color-${optionIdx}`}
                        name="color[]"
                        value={option.value}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedFilters.language.includes(option.value)}
                        onChange={() => handleCheckboxChange('language', option.value)}
                      />
                      <label
                        htmlFor={`color-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block font-medium">Level</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.level.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`size-${optionIdx}`}
                        name="size[]"
                        value={option.value}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedFilters.level.includes(option.value)}
                        onChange={() => handleCheckboxChange('level', option.value)}
                      />
                      <label
                        htmlFor={`size-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="block font-medium">Category</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {categories.map((category, optionIdx) => (
                    <div key={optionIdx} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`category-${optionIdx}`}
                        name="category[]"
                        value={category.id}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedFilters.category.includes(category.id)}
                        onChange={() => handleCheckboxChange('category', category.id)}
                      />
                      <label
                        htmlFor={`category-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-600"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </Disclosure.Panel>

        <div className="col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8 space-x-4">
            <Menu as="div" className="relative inline-block">
              <div className="flex">
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <button
                            onClick={() => handleSortChange(option.value)}
                            className={classNames(
                              selectedSortingOption === option.value
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm w-full text-left',
                            )}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </Disclosure>
      <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {courses?.length > 0 && courses.map((course) => <Card key={course.id} course={course} />)}
      </div>
      <div className="my-4" />
      <StandardPagination
        data={courses}
        count={count}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
