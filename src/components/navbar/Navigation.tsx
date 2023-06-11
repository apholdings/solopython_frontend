'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import { useSpring, motion } from 'framer-motion';
import Authentication from './Authentication';
import ShoppingCart from './ShoppingCart';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Menu, Popover, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import {
  Bars3Icon,
  BookmarkSquareIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  NewspaperIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  UserGroupIcon,
  WalletIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const company = [
  { name: 'About', href: '/about', icon: InformationCircleIcon },
  { name: 'Careers', href: '#', icon: BriefcaseIcon },
  { name: 'Press', href: '#', icon: NewspaperIcon },
  { name: 'Affiliates', href: '#', icon: WalletIcon },
];
const resources = [
  { name: 'Community', href: '#', icon: UserGroupIcon },
  { name: 'Blog', href: '#', icon: GlobeAltIcon },
  { name: 'Guides', href: '#', icon: BookmarkSquareIcon },
  { name: 'Webinars', href: '#', icon: ComputerDesktopIcon },
];
const blogPosts = [
  {
    id: 1,
    name: 'Boost your conversion rate',
    href: '#',
    preview:
      'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
    imageUrl:
      'https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80',
  },
  {
    id: 2,
    name: 'How to use search engine optimization to drive traffic to your site',
    href: '#',
    preview:
      'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
    imageUrl:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80',
  },
];

export default function Navigation() {
  const { data: session } = useSession();

  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 1;
  const initialY = -1; // Initial vertical position above the element
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);
  const y = useSpring(initialY, springConfig);

  function onMount() {
    // scale.set(1);
    opacity.set(1);
    y.set(0);
  }

  function onHide({ unmount }) {
    const cleanup = y.onChange((value) => {
      if (value <= initialY) {
        cleanup();
        unmount();
      }
    });

    y.set(initialY);
    opacity.set(0);
  }

  const pathname = usePathname();

  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="hidden lg:flex lg:gap-x-10">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="cursor-pointer flex text-md mt-2.5  font-circular-bold leading-6 text-navbar-gray transition duration-200 ease-in-out">
            Learn
            <ChevronDownIcon className="h-4 w-auto inline-flex text-navbar-gray font-circular-bold mt-1 ml-1.5" />
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded bg-white border border-gray-900 shadow-neubrutalism-lg shadow-blue-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/courses"
                    className={classNames(
                      active ? ' text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm font-circular-medium',
                    )}
                  >
                    Online Courses
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <Popover.Group>
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open ? 'text-gray-900' : 'text-gray-500',
                  'flex text-md mt-2.5  font-circular-bold leading-6 text-navbar-gray transition duration-200 ease-in-out',
                )}
              >
                Resources
                <ChevronDownIcon className="h-4 w-auto inline-flex text-navbar-gray font-circular-bold mt-1 ml-1.5" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Popover.Panel className="absolute inset-x-0 top-full z-10 hidden transform  md:block">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 bg-white" />
                    <div className="w-1/2 bg-gray-50" />
                  </div>
                  <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                    <nav className="grid gap-y-10 bg-white px-4 py-8 sm:grid-cols-2 sm:gap-x-8 sm:px-6 sm:py-12 lg:px-8 xl:pr-12">
                      <div>
                        <h3 className="text-base font-circular-medium text-gray-500">Company</h3>
                        <ul role="list" className="mt-5 space-y-6">
                          {company.map((item) => (
                            <li key={item.name} className="flow-root">
                              <Link
                                href={item.href}
                                className="-m-3 flex items-center rounded-md p-3 text-gray-900 hover:bg-gray-50"
                              >
                                <item.icon
                                  className="h-6 w-6 flex-shrink-0 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="ml-4 text-base font-circular-book ">
                                  {item.name}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-base font-circular-medium text-gray-500">Resources</h3>
                        <ul role="list" className="mt-5 space-y-6">
                          {resources.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-3 flex items-center rounded-md p-3  text-gray-900 hover:bg-gray-50"
                              >
                                <item.icon
                                  className="h-6 w-6 flex-shrink-0 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="ml-4 text-base font-circular-book">
                                  {item.name}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </nav>
                    <div className="bg-gray-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 xl:pl-12">
                      <div>
                        <h3 className="text-base font-circular-medium text-gray-500">
                          From the blog
                        </h3>
                        <ul role="list" className="mt-6 space-y-6">
                          {blogPosts.map((post) => (
                            <li key={post.id} className="flow-root">
                              <Link
                                href={post.href}
                                className="-m-3 flex rounded-lg p-3 hover:bg-gray-100"
                              >
                                <div className="hidden flex-shrink-0 sm:block">
                                  <img
                                    className="h-20 w-32 rounded-md object-cover"
                                    src={post.imageUrl}
                                    alt=""
                                  />
                                </div>
                                <div className="w-0 flex-1 sm:ml-8">
                                  <h4 className="truncate text-base font-circular-medium text-gray-900">
                                    {post.name}
                                  </h4>
                                  <p className="mt-1 text-sm text-gray-500">{post.preview}</p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 ">
                        <Link
                          href="/blog"
                          className="text-blue-500 text-md font-circular-book hover:text-blue-600"
                        >
                          View all posts
                          <span aria-hidden="true"> &rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </Popover.Group>

      <Link
        href="/pricing"
        className={`text-md mt-2.5 font-circular-bold leading-6  transition duration-200 ease-in-out ${
          pathname === '/pricing'
            ? 'text-blue-500 hover:text-blue-700'
            : 'text-navbar-gray hover:text-gray-700'
        } `}
      >
        Pricing
      </Link>

      {!session?.user && (
        <button
          onClick={() => {
            setOpenLogin(true);
          }}
          className={`text-md mt-1 font-circular-bold leading-6  transition duration-200 ease-in-out ${
            pathname === '/?login=True'
              ? 'text-blue-500 hover:text-blue-700'
              : 'text-navbar-gray hover:text-gray-700'
          } `}
        >
          Login
        </button>
      )}

      <Authentication openLogin={openLogin} setOpenLogin={setOpenLogin} />
    </div>
  );
}
