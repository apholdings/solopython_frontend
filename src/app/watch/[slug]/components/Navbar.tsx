'use client';

import Button from '@/components/Button';
import { ICourseDetail } from '@/interfaces/courses/CourseDetail';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  ShareIcon,
  StarIcon,
  TrophyIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
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

export default function Navbar({ course }: { course: ICourseDetail }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [loading, setLoading] = useState(false);

  const [body, setBody] = useState('');
  const [rating, setRating] = useState('');

  const shareUrl = 'test';

  const onReview = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-700 bg-dark dark:border-dark-main dark:bg-dark-main">
      <button
        type="button"
        className="focus:ring-indigo-500 border-r  border-gray-700 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3CenterLeftIcon className="h-6 w-6 text-white" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-between px-4">
        <div className="flex flex-shrink-0 items-center ">
          <div className="hidden md:flex">
            <button
              type="button"
              onClick={() => {
                router.back();
              }}
            >
              <Image
                alt="logo"
                className="h-10 w-auto"
                width={100}
                height={100}
                src="/assets/img/logos/logo.png"
              />
            </button>
          </div>
        </div>
        <span className="mt-5 ml-5 text-gray-700">&#124;</span>
        <div className="mt-5 ml-4 flex flex-1 truncate text-sm text-gray-200">{course?.title}</div>

        <div className="ml-4 flex items-center md:ml-6">
          <div className="absolute inset-y-0  right-0 flex cursor-pointer items-center  pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* {!review && (
              <button
                onClick={() => setIsOpenReview(true)}
                type="button"
                className="font-regular inline-flex w-full py-2 text-white hover:bg-opacity-10"
              >
                <StarIcon
                  className={`
                        ${review ? 'text-almond-600' : 'text-gray-500'} mt-0.5 h-5 w-auto
                        `}
                  aria-hidden="true"
                />
                <span className="mx-2 hover:text-gray-300">Leave a rating</span>
              </button>
            )} */}

            <Transition.Root show={isOpenReview} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={setIsOpenReview}>
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
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg dark:bg-dark-bg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                        <div>
                          <div className="mt-3 ">
                            <Dialog.Title
                              as="p"
                              className="text-lg font-bold leading-6 dark:text-dark-txt text-gray-900"
                            >
                              Leave Rating
                            </Dialog.Title>
                            <form onSubmit={(e) => onReview(e)} className="my-4">
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

                              <textarea
                                className="text-md duration block dark:ring-dark-border dark:border-dark-border w-full border focus:ring-none focus:outline-none border-dark py-2.5 pl-4 font-medium transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                                type="text"
                                name="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                                rows="3"
                                placeholder="Reseña"
                              />
                              {loading ? (
                                <Button type="button" className="mt-4">
                                  sending...
                                </Button>
                              ) : (
                                <Button type="submit" className="mt-4">
                                  Send Review
                                </Button>
                              )}
                            </form>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>

            <button
              type="button"
              onClick={() => {
                setOpenShare(true);
              }}
              className="mr-2 flex border dark:border-dark-second dark:text-dark-txt border-white px-4 py-2 font-bold text-white hover:bg-gray-50 hover:bg-opacity-10 hover:text-gray-100"
            >
              Share
              <ShareIcon className="mt-1 ml-1 inline-flex h-4 w-4 dark:text-dark-txt text-white" />
            </button>
            <Transition.Root show={openShare} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={setOpenShare}>
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
                                    <FacebookIcon size={40} round />
                                  </FacebookShareButton>
                                  <WhatsappShareButton url={shareUrl}>
                                    <WhatsappIcon size={40} round />
                                  </WhatsappShareButton>
                                  <TwitterShareButton url={shareUrl}>
                                    <TwitterIcon size={40} round />
                                  </TwitterShareButton>
                                  <RedditShareButton url={shareUrl}>
                                    <RedditIcon size={40} round />
                                  </RedditShareButton>
                                  <LinkedinShareButton url={shareUrl}>
                                    <LinkedinIcon size={40} round />
                                  </LinkedinShareButton>
                                  <TelegramShareButton url={shareUrl}>
                                    <TelegramIcon size={40} round />
                                  </TelegramShareButton>
                                  <EmailShareButton url={shareUrl}>
                                    <EmailIcon size={40} round />
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
          </div>
        </div>
      </div>
    </div>
  );
}
