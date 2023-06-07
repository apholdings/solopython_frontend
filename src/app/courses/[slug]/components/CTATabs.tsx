'use client';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Dialog, Tab, Transition } from '@headlessui/react';
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
import { Fragment, useContext, useEffect, useState } from 'react';
import { ReceiptRefundIcon, XMarkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Button from '@/components/Button';
import CouponContext from '@/context/couponContext';
import { ToastError } from '@/components/toast/ToastError';
import { CheckCoupon } from '@/utils/api/fetchCheckCoupon';
import { ToastSuccess } from '@/components/toast/ToastSuccess';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CTATabs({ course }) {
  const [openShare, setOpenShare] = useState(false);
  const [openTrade, setOpenTrade] = useState(false);
  const [openJoinAffiliate, setOpenJoinAffiliate] = useState(false);
  const shareUrl = 'htet';

  const {
    id,
    name,
    user,
    fixedPriceCoupon,
    percentageCoupon,
    contentType,
    objectId,
    uses,
    setId,
    setName,
    setUser,
    setFixedPriceCoupon,
    setPercentageCoupon,
    setContentType,
    setObjectId,
    setUses,
  } = useContext(CouponContext);

  const [couponName, setCouponName] = useState('');

  async function applyCoupon(e) {
    e.preventDefault();
    const res = await CheckCoupon(couponName, course?.id);
    if (res.status === 200) {
      ToastSuccess(`Coupon ${couponName} has been applied.`);
      const { id, name, user, fixed_price_coupon, percentage_coupon, content_type, object_id } =
        res.results.coupon;
      setId(id);
      setName(name);
      setUser(user);
      setFixedPriceCoupon(fixed_price_coupon);
      setPercentageCoupon(percentage_coupon);
      setContentType(content_type);
      setObjectId(object_id);

      if (res.results.type === 'fixed') {
        setUses(fixed_price_coupon.uses);
      } else if (res.results.type === 'percentage') {
        setUses(percentage_coupon.uses);
      }
    } else {
      ToastError('Coupon Not Available.');
    }
  }

  useEffect(() => {
    // Resets the coupon context to initial state every time this page loads
    setId(null);
    setName(null);
    setUser(null);
    setFixedPriceCoupon(null);
    setPercentageCoupon(null);
    setContentType(null);
    setUses(null);
  }, []);

  return (
    <div>
      <Tab.Group>
        <Tab.List className="-mb-px mt-4 grid space-x-1 space-y-1 p-1 sm:flex sm:space-x-2 sm:space-y-0">
          <div
            className="col-span-1 w-full py-2.5 text-md leading-5 md:col-span-2 flex items-center justify-center space-x-2 border-b-2 border-gray-300 p-1 font-base text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2 cursor-pointer"
            onClick={() => {
              setOpenShare(true);
            }}
          >
            Share
          </div>
          {/* <Tab
            className={({ selected }) =>
              classNames(
                'col-span-1 w-full py-2.5 text-md leading-5 md:col-span-2',
                '',
                selected
                  ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-medium text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                  : 'flex items-center justify-center border-b-2 border-gray-300 p-1 font-base text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
              )
            }
          >
            Affiliate
          </Tab> */}

          <Tab
            className={({ selected }) =>
              classNames(
                'col-span-1 w-full py-2.5 text-md leading-5 md:col-span-2',
                '',
                selected
                  ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-medium text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                  : 'flex items-center justify-center border-b-2 border-gray-300 p-1 font-base text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
              )
            }
          >
            Coupon
          </Tab>
        </Tab.List>
        <Tab.Panels>
          {/* Affiliate Panel Course */}
          {/* <Tab.Panel>Affiliate panel</Tab.Panel> */}
          {/* Apply Coupon */}
          <Tab.Panel>
            <form onSubmit={(e) => applyCoupon(e)} className="relative mt-4">
              <div className="relative flex flex-grow items-stretch focus-within:z-20">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <ReceiptRefundIcon
                    className="h-5 w-5 dark:text-dark-txt-secondary text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                {name ? (
                  <input
                    id="discount_coupon"
                    disabled
                    required
                    placeholder={name}
                    className="block w-full dark:bg-dark-second focus:outline-none focus:ring-none truncate border dark:text-dark-txt dark:border-dark-border border-gray-700 py-4 px-12 text-sm"
                  />
                ) : (
                  <input
                    id="discount_coupon"
                    onChange={(e) => setCouponName(e.target.value)}
                    value={couponName}
                    required
                    className="block w-full dark:bg-dark-second focus:outline-none focus:ring-none truncate border dark:text-dark-txt dark:border-dark-border border-gray-700 py-4 px-10 text-sm"
                  />
                )}
                <div className=" absolute inset-y-0 right-0 flex items-center dark:bg-dark-third border dark:border-dark-border dark:hover:bg-dark-main bg-dark-main px-6 hover:bg-gray-900">
                  {name ? (
                    <div
                      className="text-sm font-bold  dark:text-dark-txt  text-white "
                      id="price-currency"
                    >
                      Applied
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="text-sm font-bold  dark:text-dark-txt  text-white "
                      id="price-currency"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
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

          <div className="fixed inset-0 z-50 overflow-y-auto">
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
                <Dialog.Panel className="relative transform overflow-hidden bg-white dark:bg-dark-bg  px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
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
      <Transition.Root show={openJoinAffiliate} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenJoinAffiliate}>
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

          <div className="fixed inset-0 z-50 overflow-y-auto">
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
                <Dialog.Panel className="relative transform overflow-hidden bg-white  dark:bg-dark-bg px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                  {/* Description about program */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
                      <div className="">
                        <p className="text-xl font-semibold leading-6 dark:text-dark-txt text-gray-900">
                          Join Affiliate Program and Start Earning Passive Income
                        </p>
                        <p className="text-md mt-1 dark:text-dark-txt-secondary text-gray-500">
                          Start earning passive income in cryptocurrency by promoting online
                          courses!
                        </p>
                      </div>
                      <Link href="/affiliates" className=" mt-4 flex-shrink-0">
                        <Button>Learn More</Button>
                      </Link>
                    </div>
                    <div className="mt-5 border-t dark:border-dark-border border-gray-200">
                      <dl className="sm:divide-y dark:divide-dark-border sm:divide-gray-200">
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                          <dt className="text-sm font-medium dark:text-dark-txt text-gray-500">
                            Starting rank
                          </dt>
                          <dd className="mt-1 text-sm dark:text-dark-txt-secondary text-gray-900 sm:col-span-2 sm:mt-0">
                            Bronze
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                          <dt className="text-sm font-medium dark:text-dark-txt text-gray-500">
                            Starting commission
                          </dt>
                          <dd className="mt-1 text-sm dark:text-dark-txt-secondary text-gray-900 sm:col-span-2 sm:mt-0">
                            16%
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                          <dt className="text-sm font-medium dark:text-dark-txt text-gray-500">
                            Requisites
                          </dt>
                          <dd className="mt-1 text-sm dark:text-dark-txt-secondary text-gray-900 sm:col-span-2 sm:mt-0">
                            HERE GOES AFFILIATE BUTTON JOIN
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                          <dt className="text-sm font-medium dark:text-dark-txt text-gray-500">
                            Pipeline
                          </dt>
                          <dd className="mt-1 text-sm dark:text-dark-txt-secondary text-gray-900 sm:col-span-2 sm:mt-0">
                            5 users
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                          <dt className="text-sm font-medium dark:text-dark-txt text-gray-500">
                            How it works
                          </dt>
                          <dd className="mt-1 space-y-2 text-sm dark:text-dark-txt-secondary text-gray-900 sm:col-span-2 sm:mt-0">
                            <p className="block">
                              Our program offers you the opportunity to earn commissions by
                              referring others to our courses. As you refer more people, you'll
                              progress through the ranks and earn higher commissions.
                            </p>
                            <p className="block">
                              As you progress through our rank system, your commission rate will
                              increase. Our program has five different levels of ranks, each with
                              its own set of requirements for eligibility. The higher the rank, the
                              higher the commission rate you'll receive.
                            </p>
                            <p className="block">
                              Our system is powered by blockchain technology and our contract
                              automatically handles the payments for you. You don't have to worry
                              about any complicated payment processes or dealing with third-party
                              payment processors.{' '}
                            </p>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
