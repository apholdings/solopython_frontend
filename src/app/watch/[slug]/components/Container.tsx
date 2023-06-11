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
import {
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  InformationCircleIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon,
  SunIcon,
} from '@heroicons/react/20/solid';
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
import QuestionsPanel from './questions/QuestionsPanel';
import ReviewsPanel from './reviews/ReviewsPanel';
import CommentsPanel from './CommentsPanel';
import SimpleEditor from '@/components/SimpleEditor';
import { IReview } from '@/interfaces/reviews/Review';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';

import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import slugify from 'react-slugify';
import moment from 'moment';
import DOMPurify from 'isomorphic-dompurify';
import CircleLoader from 'react-spinners/CircleLoader';

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

  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<string>('');
  const [reviewBody, setReviewBody] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [review, setReview] = useState<IReview | null>(null);
  const [reviewsCount, setReviewsCount] = useState<number>(0);
  const [reviewsCounts, setReviewsCounts] = useState<IReview[]>([]);
  const [reviewsCurrentPage, setReviewsCurrentPage] = useState(1);
  const [reviewsPageSize, setReviewsPageSize] = useState(12);
  const [reviewsMaxPageSize, setReviewsMaxPageSize] = useState(100);
  const [selectedRating, setSelectedRating] = useState(undefined);
  const [isOpenReview, setIsOpenReview] = useState<boolean>(false);

  const [reviewsAvg, setReviewsAvg] = useState(0);
  const [reviewsTotalCount, setReviewsTotalCount] = useState(0);

  const fetchReviews = useCallback(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/api/reviews/course/list/?course_id=${course?.id}&p=${reviewsCurrentPage}&page_size=${reviewsPageSize}&max_page_size=${reviewsMaxPageSize}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${session?.user?.accessToken}`,
        },
      },
    );

    setReviews(res.data.results);
    setReviewsCounts(res.data.extra_data.counts);
    setReviewsAvg(res.data.extra_data.average);
    setReviewsTotalCount(res.data.extra_data.totalCount);
    setReviewsCount(res.data.count);
  }, [session?.user?.accessToken, course]);

  useEffect(() => {
    if (session?.user?.accessToken && course) {
      const fetchReview = async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/reviews/course/get/${course?.id}/`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${session?.user?.accessToken}`,
            },
          },
        );

        setReview(res.data.results);
      };

      fetchReview();
      fetchReviews();
    }
  }, [session?.user?.accessToken, course]);

  const handleCreateReview = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const body = JSON.stringify({
      rating,
      content: reviewBody,
      course_id: course?.id,
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/reviews/course/create/`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${session?.user?.accessToken}`,
      },
      body: body,
    });

    const data = await res.json();

    if (res.status === 200) {
      setReviews(data.results);
      setReviewsCount(data.count);
      setReviewBody('');
      setRating('');
      setOpen(false);
    }

    setLoading(false);
  };

  const handleEditReview = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const body = JSON.stringify({
      course_id: course?.id,
      review_rating: rating,
      reviewBody,
      review_id: review?.id,
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/reviews/course/edit/`, {
      cache: 'no-store',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${session?.user?.accessToken}`,
      },
      body: body,
    });

    const data = await res.json();

    if (res.status === 200) {
      setReviews(data.results);
      setReview(data.extra_data.review);
      setReviewsCount(data.count);
      setReviewsCounts(data.extra_data.counts);
      setReviewsTotalCount(data.extra_data.totalCount);
      setReviewBody('');
      setRating('');
      setOpen(false);
      setReviewsAvg(data.extra_data.average_rating);
    }

    setLoading(false);
  };

  const [openShare, setOpenShare] = useState<boolean>(false);
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_PUBLIC_URL}/courses/${course?.slug}`;

  // CERTIFICATE
  const [qrCode, setQRCode] = useState('');
  const [loadingCertificate, setLoadingCertificate] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);
  const [loadingFetchCertificate, setLoadingFetchCertificate] = useState(false);
  const [certificate, setCertificate] = useState(null);

  const pdfDownload = (e) => {
    e.preventDefault();
    const doc = new jsPDF('landscape', 'pt', 'A4');
    const pdfView = document.getElementById('pdf-view');
    const scale = 2; // You can adjust the scale value to improve image quality

    // Create canvas using html2canvas
    html2canvas(pdfView, { scale }).then((canvas) => {
      // Calculate the width and height of the canvas
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the canvas image to the PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.5); // Use JPEG compression with a quality setting of 0.5
      doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

      // Save the PDF
      doc.save(`certificate_of_completion${slugify(course?.title)}.pdf`);
    });
  };

  const [qrGenerated, setGenerateQR] = useState(false);
  const generateQRCode = () => {
    QRCode.toDataURL(`https://polygonscan.com/address/${course?.nft_address}`).then(setQRCode);
    setGenerateQR(true);
  };
  const [certificateGenerated, setGenerateCertificate] = useState(false);

  // const handleGenerateCertificate = async (e) => {
  //   e.preventDefault();
  //   setLoadingCertificate(true);

  //   const res = await GenerateCertificate(courseUUID);
  //   setCertificate(res.data.results);

  //   setLoadingCertificate(false);
  //   setGenerateCertificate(true);
  // };

  useEffect(() => {
    if (course && session?.user?.accessToken) {
      setCertificate({
        id: crypto.randomUUID(),
        certificateUUID: crypto.randomUUID(),
        // Course Details
        title: course?.title,
        description: course?.short_description,
        // Instructor Details
        instructor: course?.author.username,
        instructor_first_name: course?.author.first_name,
        instructor_last_name: course?.author.last_name,
        // User Details
        user: session?.user.name,
        user_first_name: session?.user.name,
        user_last_name: session?.user.name,
        user_picture: session?.user?.image,
        date: moment().format('MMM, Do, YYYY'),
        length: course?.total_duration,
        student_rating: course?.student_rating,
        student_rating_no: course?.student_rating_no,
        price: course?.price,
        qrCode,
        thumbnail: course?.images[0].file,
        course_uuid: course?.id,
      });
      generateQRCode();
    }
  }, [course, session?.user?.accessToken]);

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
                            href="https://discord.gg/BcxQwhXjZh"
                            target="_blank"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <LifebuoyIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            Support
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
                className="flex grow flex-col gap-y-5 overflow-y-auto bg-white shadow dark:bg-dark-main px-6 pb-4"
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
                        href="https://discord.gg/BcxQwhXjZh"
                        target="_blank"
                        className="group items-center justify-center -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-white"
                      >
                        <LifebuoyIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
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
                {/* <label htmlFor="search-field" className="sr-only">
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
                /> */}
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {!review && (
                  <button
                    onClick={() => {
                      setOpen(!open);
                    }}
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <StarIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setOpenCertificate(true);
                  }}
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <TrophyIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  onClick={() => {
                    setOpenShare(true);
                  }}
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
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
                      <span className="inline-block animate-pulse h-8 w-8 overflow-hidden rounded-full bg-gray-50">
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
                        <div className="w-20 ml-2.5 animate-pulse rounded-2xl bg-gray-50 py-2" />
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

          <main className="py-4 bg-gray-50 dark:bg-dark-bg h-screen">
            <div className="px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg">
              {episode !== null ? (
                <>
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

                  {episode?.content && !episode?.file && (
                    <div>
                      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                          {episode?.title}
                        </h1>
                        <p className="mt-6 text-xl leading-8">{episode?.description}</p>
                        <div className="mt-10 max-w-2xl">
                          <p dangerouslySetInnerHTML={{ __html: episode?.content }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <Tab.Group>
                    <Tab.List className="-mb-px mt-4 bg-gray-50 dark:bg-dark-bg space-x-1 space-y-1 p-1 sm:flex sm:space-x-2 sm:space-y-0 grid grid-cols-4">
                      {/* <Tab
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
                      </Tab> */}

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
                    <Tab.Panels className={`bg-gray-50 dark:bg-dark-bg`}>
                      {/* <Tab.Panel>
                        <OverviewPanel course={course} />
                      </Tab.Panel> */}
                      <Tab.Panel>
                        <CommentsPanel episode={episode} />
                      </Tab.Panel>
                      <Tab.Panel>
                        <QuestionsPanel episode={episode} />
                      </Tab.Panel>
                      <Tab.Panel>
                        <ReviewsPanel
                          course={course}
                          review={review}
                          setReview={setReview}
                          setReviews={setReviews}
                          reviews={reviews}
                          reviewsAvg={reviewsAvg}
                          setReviewsAvg={setReviewsAvg}
                          reviewsTotalCount={reviewsTotalCount}
                          setReviewsTotalCount={setReviewsTotalCount}
                          reviewsCounts={reviewsCounts}
                          setSelectedRating={setSelectedRating}
                          isOpenReview={isOpenReview}
                          setOpen={setOpen}
                          reviewsCount={reviewsCount}
                          reviewsPageSize={reviewsPageSize}
                          reviewsCurrentPage={reviewsCurrentPage}
                          setReviewsCurrentPage={setReviewsCurrentPage}
                        />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </>
              ) : (
                <OverviewPanel course={course} />
              )}
            </div>
          </main>
        </div>

        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Create Review
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Select a rating and write a review
                          </p>
                        </div>
                      </div>
                    </div>
                    <form
                      onSubmit={(e) => {
                        if (review) {
                          handleEditReview(e);
                        } else {
                          handleCreateReview(e);
                        }
                      }}
                      className="mt-5 sm:mt-6"
                    >
                      <select
                        name="rating"
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        required
                        placeholder="1 - 5"
                      >
                        <option value="" disabled>
                          0 - 5
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>

                      <div className="mt-4">
                        <label className="block text-sm font-bold dark:text-dark-txt text-gray-900">
                          Details (optional)
                        </label>
                        <SimpleEditor data={reviewBody} setData={setReviewBody} maxLength={2400} />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 mt-4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {review ? 'Edit Review' : 'Create Review'}
                      </button>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <Transition.Root show={openShare} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setOpenShare}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-100"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-75"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden bg-white dark:bg-dark-bg px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                    <div>
                      <div className="mt-3 ">
                        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                          <div className="ml-4">
                            <h3 className="text-lg font-black leading-6 dark:text-dark-txt text-gray-900">
                              Share this course
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setOpenShare(false);
                            }}
                            className="ml-4 flex-shrink-0"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="mt-4">
                          <div className="space-x-2 ">
                            <CopyToClipboard text={shareUrl}>
                              <div
                                // onClick={()=>{
                                //     dispatch(setAlert('URL Copied to clipboard','success'))
                                // }}
                                className="relative mb-4 cursor-pointer"
                              >
                                <div className="text-md block w-full truncate border dark:bg-dark-third dark:text-dark-txt-secondary dark:border-dark-border border-gray-700 py-4 pl-2 pr-12">
                                  {shareUrl}
                                </div>
                                <div className=" absolute inset-y-0 right-0 flex items-center dark:bg-dark-second border dark:border-dark-border dark:hover:bg-dark-main bg-dark-main px-6 hover:bg-gray-900">
                                  <span
                                    className="text-md font-bold dark:text-dark-txt text-white "
                                    id="price-currency"
                                  >
                                    Copy URL
                                  </span>
                                </div>
                              </div>
                            </CopyToClipboard>
                            <div className="items-center justify-center space-x-2 text-center">
                              <FacebookShareButton url={shareUrl}>
                                <FacebookIcon size={40} round={true} />
                              </FacebookShareButton>
                              <WhatsappShareButton url={shareUrl}>
                                <WhatsappIcon size={40} round={true} />
                              </WhatsappShareButton>
                              <TwitterShareButton url={shareUrl}>
                                <TwitterIcon size={40} round={true} />
                              </TwitterShareButton>
                              <RedditShareButton url={shareUrl}>
                                <RedditIcon size={40} round={true} />
                              </RedditShareButton>
                              <LinkedinShareButton url={shareUrl}>
                                <LinkedinIcon size={40} round={true} />
                              </LinkedinShareButton>
                              <TelegramShareButton url={shareUrl}>
                                <TelegramIcon size={40} round={true} />
                              </TelegramShareButton>
                              <EmailShareButton url={shareUrl}>
                                <EmailIcon size={40} round={true} />
                              </EmailShareButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <Transition.Root show={openCertificate} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setOpenCertificate}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                    <div className="-ml-4 mb-2 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                      <div className="ml-4 mt-2">
                        <h3 className="text-lg font-black leading-6 text-gray-900">
                          Download certificate
                        </h3>
                      </div>
                      <div className="ml-4 mt-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setOpenCertificate(false)}
                          className="relative inline-flex "
                        >
                          <XMarkIcon className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Certificate */}
                    <div
                      id="pdf-view"
                      className="relative grid h-[560px] w-full grid-cols-12 px-4 pt-3"
                    >
                      {/* Watermark */}
                      <div
                        className="top-0 left-0 h-56 w-full md:absolute md:h-full"
                        style={{ zIndex: 0 }}
                      >
                        <img
                          width={1200}
                          height={1200}
                          src="/assets/img/placeholder/oo_watermark_beige.png"
                          className="pointer-events-none -z-10 h-full w-full select-none object-cover"
                          style={{ zIndex: 0 }}
                          alt="background"
                        />
                      </div>

                      {/* LEFT side */}
                      <div className="col-span-8 mr-2">
                        <div className=" border-green-400 h-[460px] w-full border-opacity-50 rounded-xl border-2  px-6 py-8 ">
                          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 ">
                              <img
                                width={256}
                                height={256}
                                alt=""
                                src="/assets/img/logos/logo.png"
                                className="h-12 w-auto"
                              />
                            </div>
                            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                              {certificate ? <img src={qrCode} className="w-8" alt="" /> : <div />}
                            </div>
                          </div>
                          <div className="mt-12">
                            <p className=" text-sm text-gray-500">Certificate of completion</p>
                            <h3 className="my-4 text-xl font-bold leading-6 text-gray-900">
                              {certificate && certificate.title}
                            </h3>
                            <h2
                              className="text-md font-regular mb-2 text-gray-900 dark:text-dark"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(course?.short_description),
                              }}
                            />
                            <p className="flex text-sm text-gray-500">
                              Instructors:
                              <span className="ml-1 font-bold text-gray-900">
                                {certificate && certificate.instructor_first_name}{' '}
                                {certificate && certificate.instructor_last_name}
                              </span>
                              {/* <span className='font-bold ml-1 text-gray-900'>{details&&details.author.username}</span> */}
                            </p>
                            <p className="flex text-sm text-gray-500">
                              NFT Address:
                              <span className="ml-1 font-bold text-gray-900">
                                {course?.nft_address}
                              </span>
                              {/* <span className='font-bold ml-1 text-gray-900'>{details&&details.author.username}</span> */}
                            </p>
                            <div className="absolute bottom-24">
                              <p className="mb-2 text-2xl font-bold text-gray-700">
                                {certificate && certificate.instructor}
                              </p>
                              <div className="-ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                                <div className="ml-4">
                                  <p className="flex text-sm text-gray-500">
                                    Date
                                    <span className="ml-2 font-bold text-gray-900">
                                      {certificate && certificate.date}
                                    </span>
                                  </p>
                                  <div className="mb-2 grid w-full grid-cols-12">
                                    <p className="col-span-4 flex text-sm text-gray-500">
                                      Length
                                      <span className="ml-2 font-bold text-gray-900">
                                        {certificate && certificate.length} total hours
                                      </span>
                                    </p>
                                    {certificate ? (
                                      <p className="col-span-8 ml-4 mt-0.5 text-xs text-gray-500">
                                        Course Token no. {course?.token_id}
                                      </p>
                                    ) : (
                                      <div />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="font-regular mt-1.5 text-xs text-gray-500">
                          This certificate above certifies that{' '}
                          <span className="text-purple-600">
                            {' '}
                            {certificate && certificate.user_first_name}{' '}
                            {certificate && certificate.user_last_name}{' '}
                          </span>
                          successfully completed the course{' '}
                          <span className="text-purple-600">
                            {' '}
                            {certificate && certificate.title}{' '}
                          </span>{' '}
                          on {certificate && certificate.date} as taught by{' '}
                          <span className="text-purple-600">
                            {certificate && certificate.instructor_first_name}{' '}
                            {certificate && certificate.instructor_last_name}{' '}
                          </span>
                          on Boomslag. The certificate indicates the entire course was completed as
                          validated by the student. The course duration represents the total video
                          hours at time of most recent completion.
                        </p>
                      </div>

                      {/* RIGHT side */}
                      <div className="col-span-4 ml-2">
                        <h3 className="text-lg font-bold leading-6 text-gray-900">
                          Certificate Recipient:
                        </h3>
                        <div className="mt-2 flex">
                          <div className="mr-4 flex-shrink-0">
                            {/* <Image
                              width={256}
                              height={256}
                              className="inline-block h-14 w-14 rounded-full"
                              src={authState && authState.profile.picture}
                              alt=""
                            /> */}
                          </div>
                          <div>
                            <h4 className="text-md font-medium dark:text-dark">
                              {session?.user?.name} {session?.user?.name}
                            </h4>
                          </div>
                        </div>
                        <h3 className="mt-8 text-lg font-bold leading-6 text-gray-900">
                          About the course:
                        </h3>
                        <div className="-ml-3.5 flex flex-col justify-center">
                          <div className="relative flex w-72   max-w-xs flex-col space-y-1 rounded-xl p-3 ">
                            {/* Image */}
                            <div className="grid w-full place-items-center">
                              {/* <Image
                                width={256}
                                height={256}
                                src={certificate && certificate.thumbnail}
                                alt={
                                  details && details.title.length > 46
                                    ? details && details.title.slice(0, 45)
                                    : details && details.title
                                }
                                className=""
                              /> */}
                            </div>
                            <h2 className="text-md dark:text-black font-semibold">
                              {course?.title}
                            </h2>
                            <p className="text-xs dark:text-dark text-gray-600">
                              {course?.author.first_name} {course?.author.last_name}
                            </p>
                            <div className="flex items-center">
                              <p className="text-yellow-500 mr-1 text-sm font-bold">
                                {course?.student_rating} / 5
                              </p>

                              <p className="ml-1 text-sm text-gray-600">
                                ({course?.student_rating_no})
                              </p>
                            </div>
                            <p className="text-xs text-gray-600">
                              {course?.total_duration} total hours
                            </p>
                            <p className="text-xs font-bold text-gray-900">$ {course?.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Download Cert button */}
                    <div className="float-right mt-4 flex">
                      {loadingFetchCertificate ? (
                        <CircleLoader
                          loading={loadingFetchCertificate}
                          className="inline-flex"
                          size={20}
                          color="#1e1f48"
                        />
                      ) : (
                        <>
                          {loadingCertificate ? (
                            <CircleLoader
                              loading={loadingCertificate}
                              className="inline-flex"
                              size={20}
                              color="#1e1f48"
                            />
                          ) : (
                            <>
                              {certificate || certificateGenerated ? (
                                <div />
                              ) : (
                                <button
                                  type="button"
                                  // onClick={handleGenerateCertificate}
                                  className="px-6 py-2 text-dark hover:text-purple-600"
                                >
                                  1) Generate certificate
                                </button>
                              )}

                              {certificate && !qrGenerated && (
                                <button
                                  type="button"
                                  onClick={generateQRCode}
                                  className="px-6 py-2 text-dark hover:text-purple-600"
                                >
                                  2) Generate QRCode
                                </button>
                              )}

                              {certificateGenerated && (
                                <button
                                  type="button"
                                  onClick={generateQRCode}
                                  className="px-6 py-2 text-dark hover:text-purple-600"
                                >
                                  2) Generate QRCode
                                </button>
                              )}
                              {certificate && qrGenerated ? (
                                <button
                                  type="button"
                                  onClick={pdfDownload}
                                  className="bg-dark-main px-6 py-2 text-white"
                                >
                                  Download
                                </button>
                              ) : (
                                // <div className='flex'>
                                //     <ArrowPathIcon  className='h-5 w-5'/>
                                // </div>
                                <div className="inline-flex select-none bg-gray-200 px-6 py-2 text-gray-700">
                                  Download
                                </div>
                              )}
                            </>
                          )}
                          <div />
                        </>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}
