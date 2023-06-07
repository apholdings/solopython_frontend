'use client';

import { motion, AnimatePresence } from 'framer-motion';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { Dialog, Menu, Tab, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  StarIcon,
  TrophyIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, MagnifyingGlassIcon, SunIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Logo from './Logo';
import { useRouter } from 'next/navigation';
import DarkModeButton from './DarkModeButton';
import Video from './Video';
import { ICourseDetail } from '@/interfaces/courses/CourseDetail';
import SectionsList from './SectionsList';
import axios from 'axios';
import { IQuestion } from '@/interfaces/courses/Question';
import CustomVideo from '@/components/CustomVideo';
import { IEpisode } from '@/interfaces/courses/Episode';
import OverviewPanel from './OverviewPanel';
import QuestionsPanel from './QuestionsPanel';
import ReviewsPanel from './ReviewsPanel';
import CommentsPanel from './CommentsPanel';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Container({
  params,
  course,
}: {
  params: { slug: string };
  course: ICourseDetail;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: session, update } = useSession();

  //   const handleUpdateSession = async () => {
  //     await update({
  //       ...session,
  //       user: {
  //         ...session?.user,
  //         accessToken: 'tesdt',
  //       },
  //     });
  //   };

  const [openSidebarDesktop, setOpenSidebarDesktop] = useState(true);

  const router = useRouter();

  const [sections, setSections] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [maxPageSize, setMaxPageSize] = useState(100);

  useEffect(() => {
    if (session?.user?.accessToken) {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/sections/${params?.slug}/paid/list/?p=${currentPage}&page_size=${pageSize}&max_page_size=${maxPageSize}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${session?.user?.accessToken}`,
            },
          },
        );

        setSections(res.data.results);
        setCount(res.data.count);
      };
      fetchData();
    }
  }, [session?.user?.accessToken]);

  // Episode Information
  const [file, setFile] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [description, setDescription] = useState<string>('');
  const [episode, setEpisode] = useState<IEpisode | null>(null);
  const [episode_id, setEpisodeId] = useState<string>('');

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <button
                        onClick={() => {
                          router.back();
                        }}
                      >
                        <Logo />
                      </button>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your teams
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <AnimatePresence>
          {openSidebarDesktop && (
            <motion.div
              initial={{ x: 0 }} // Initial position off the screen
              animate={{ x: 0 }} // Animate to position 0 (visible on the screen)
              exit={{ x: -300 }} // Animate back to initial position when exiting
              transition={{ duration: 0.3 }} // Animation duration
              className="hidden  lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
            >
              <motion.div
                className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-100 shadow dark:bg-dark-main px-6 pb-4"
                initial={{ opacity: 1 }} // Initial opacity is 0
                animate={{ opacity: 1 }} // Animate opacity to 1
                exit={{ opacity: 0 }} // Animate opacity back to 0 when exiting
                transition={{ duration: 0.3, delay: 0.1 }} // Animation duration with a slight delay
              >
                {' '}
                <div className="flex h-16 shrink-0 items-center">
                  <button
                    onClick={() => {
                      router.back();
                    }}
                  >
                    <Logo />
                  </button>
                  <div className="ml-4 dark:text-dark-txt text-black font-semibold text-lg">
                    {course?.title}
                  </div>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <SectionsList
                        sections={sections}
                        file={file}
                        setFile={setFile}
                        content={content}
                        setContent={setContent}
                        questions={questions}
                        setQuestions={setQuestions}
                        description={description}
                        setDescription={setDescription}
                        setEpisode={setEpisode}
                        episode_id={episode_id}
                        setEpisodeId={setEpisodeId}
                      />
                    </li>
                    <li className="mt-auto grid grid-cols-2 space-x-2">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        Settings
                      </a>
                      <DarkModeButton />
                    </li>
                  </ul>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navbar */}
        <div className={`${openSidebarDesktop ? 'lg:pl-72' : ''}`}>
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 dark:border-dark-second border-b border-gray-200 bg-white dark:bg-dark-bg px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            {!openSidebarDesktop && (
              <div className="hidden lg:flex h-16 shrink-0 items-center">
                <button
                  onClick={() => {
                    router.back();
                  }}
                >
                  <Logo />
                </button>
              </div>
            )}

            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <button
                type="button"
                onClick={() => {
                  setOpenSidebarDesktop(!openSidebarDesktop);
                }}
                className="hidden lg:block -m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <form className="relative flex flex-1 " action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>

                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block dark:bg-dark-bg h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <StarIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <TrophyIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <ShareIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    {session?.user ? (
                      <img
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src={session?.user?.image}
                        alt=""
                      />
                    ) : (
                      <span className="inline-block animate-pulse h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    )}
                    <span className="hidden lg:flex lg:items-center">
                      {session?.user ? (
                        <span
                          className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-dark-txt"
                          aria-hidden="true"
                        >
                          {session?.user?.name}
                        </span>
                      ) : (
                        <div className="w-20 ml-2.5 animate-pulse rounded-2xl bg-gray-100 py-2" />
                      )}
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-dark-main py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-50 dark:bg-dark-second' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900 dark:text-dark-txt',
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-4 bg-gray-100 dark:bg-dark-bg h-screen">
            <div className="px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-dark-bg">
              {episode !== null && (
                <>
                  <div className="pb-2 text-lg">{episode?.title}</div>
                  {episode?.file && (
                    <div className="flex items-center justify-center w-full select-none overflow-hidden max-w-full bg-black aspect-w-16 aspect-h-9 relative">
                      <video
                        src={episode?.file}
                        className="w-full"
                        controls
                        controlsList="nodownload"
                      />
                    </div>
                  )}

                  {episode?.content && <div>{episode?.content}</div>}

                  <Tab.Group>
                    <Tab.List className="-mb-px mt-4 bg-gray-100 dark:bg-dark-bg space-x-1 space-y-1 p-1 sm:flex sm:space-x-2 sm:space-y-0 grid grid-cols-4">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            'col-span-1 w-full py-2.5 text-lg font-medium leading-5 md:col-span-2',
                            '',
                            selected
                              ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-medium text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                              : 'flex items-center justify-center border-b-2 border-gray-300 p-1 font-base text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
                          )
                        }
                      >
                        Overview
                      </Tab>

                      <Tab
                        className={({ selected }) =>
                          classNames(
                            'col-span-1 w-full py-2.5 text-lg font-medium leading-5 md:col-span-2',
                            '',
                            selected
                              ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-medium text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                              : 'flex items-center justify-center border-b-2 border-gray-300 p-1 font-base text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
                          )
                        }
                      >
                        Comments
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            'col-span-1 w-full py-2.5 text-lg font-medium leading-5 md:col-span-2',
                            '',
                            selected
                              ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-medium text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                              : 'flex items-center justify-center border-b-2 border-gray-300 p-1 font-base text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
                          )
                        }
                      >
                        Q&A
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            'col-span-1 w-full py-2.5 text-lg font-medium leading-5 md:col-span-2',
                            '',
                            selected
                              ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-medium text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                              : 'flex items-center justify-center border-b-2 border-gray-300 p-1 font-base text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
                          )
                        }
                      >
                        Reviews
                      </Tab>
                    </Tab.List>
                    <Tab.Panels className={`bg-gray-100 dark:bg-dark-bg`}>
                      <Tab.Panel>
                        <OverviewPanel course={course} />
                      </Tab.Panel>
                      <Tab.Panel>
                        <CommentsPanel episode={episode} />
                      </Tab.Panel>
                      <Tab.Panel>
                        <QuestionsPanel />
                      </Tab.Panel>
                      <Tab.Panel>
                        <ReviewsPanel />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
