'use client';

import { IEpisode } from '@/interfaces/courses/Episode';
import QuestionsList from './QuestionsList';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { IQuestion } from '@/interfaces/courses/Question';
import { useSession } from 'next-auth/react';
import CircleLoader from 'react-spinners/CircleLoader';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import SimpleEditor from '@/components/SimpleEditor';
import StandardPagination from '@/components/pagination/StandardPagination';

interface ComponentProps {
  episode: IEpisode;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function QuestionsPanel({ episode }: ComponentProps) {
  const { data: session } = useSession();

  const [searchBy, setSearchBy] = useState('');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const [create, setCreate] = useState(false);

  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [maxPageSize, setMaxpageSize] = useState(100);

  const [orderQuestionsBy, setOrderQuestionsBy] = useState('');
  const [filterQuestionsBy, setFilterQuestionsBy] = useState<string | null>('');

  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const fetchQuestions = useCallback(
    async (page: number, search: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/episode/questions/list/?p=${page}&page_size=${pageSize}&max_page_size=${maxPageSize}&episode=${episode?.id}&search=${search}&order_by=${orderQuestionsBy}&filter_by=${filterQuestionsBy}`,
        {
          cache: 'no-store',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${session?.user?.accessToken}`,
          },
        },
      );

      const data = await res.json();

      if (res.status === 200) {
        setQuestions(data.results);
        setCount(data.count);
      }
    },
    [pageSize, maxPageSize, episode, orderQuestionsBy, filterQuestionsBy],
  );

  useEffect(() => {
    fetchQuestions(currentPage, '');
  }, [fetchQuestions]);

  const handleCreateQuestion = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const body = JSON.stringify({
      title,
      content,
      episode_id: episode?.id,
      access: session?.user?.accessToken,
      currentPage,
      pageSize,
      maxPageSize,
    });
    const res = await fetch(`/api/courses/episodes/questions/create/`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    const data = await res.json();

    if (res.status === 200) {
      setQuestions(data.results);
      setCount(data.count);
      setContent('');
      setTitle('');
      setCreate(false);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const onSubmitSearch = async (e: any) => {
    e.preventDefault();
    await fetchQuestions(currentPage, searchBy);
  };

  return (
    <div>
      <div className="px-10 py-6">
        {episode?.id ? (
          <form onSubmit={onSubmitSearch} className="flex">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                type="text"
                name="searchBy"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className="text-md duration block dark:ring-dark-border dark:border-dark-border w-full border focus:ring-none focus:outline-none border-dark py-2.5 pl-4 font-medium transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                placeholder="Search questions"
              />
            </div>
            {loading ? (
              <div className="relative -ml-px inline-flex items-center space-x-2 border border-gray-900 bg-black px-4 py-2 text-sm font-medium">
                <CircleLoader loading={loading} className="inline-flex" size={15} color="#ffffff" />
              </div>
            ) : (
              <button
                type="submit"
                className="relative -ml-px inline-flex items-center space-x-2 border-l dark:ring-dark-border dark:border-dark-border dark:bg-dark-main bg-black px-4 py-2 text-sm font-medium text-white"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-white" aria-hidden="true" />
              </button>
            )}
          </form>
        ) : (
          <div className="dark:text-dark-txt">Select episode to ask question</div>
        )}

        <div className="mt-2 flex space-x-2">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center border dark:border-dark-border border-gray-700 dark:text-dark-txt dark:bg-dark-main bg-white px-4 py-2.5 text-sm font-black text-gray-700  hover:bg-gray-50">
                {!episode?.id ? 'All lectures' : 'Current lecture'}
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right dark:bg-dark-main bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {loading ? (
                    <div className="grid w-full place-items-center py-6 ">
                      <CircleLoader
                        className="items-center justify-center text-center"
                        loading
                        size={20}
                        color="#1c1d1f"
                      />
                    </div>
                  ) : (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => {
                              fetchQuestions(currentPage, searchBy);
                            }}
                            className={classNames(
                              active
                                ? 'bg-gray-100 dark:bg-dark-second text-gray-900 dark:text-dark-txt'
                                : 'text-gray-700 dark:text-dark-txt-secondary',
                              'block w-full cursor-pointer px-4 py-2 text-left text-sm ',
                            )}
                          >
                            All lectures
                          </button>
                        )}
                      </Menu.Item>
                      {episode?.id && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => {
                                fetchQuestions(currentPage, searchBy);
                              }}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 dark:bg-dark-second text-gray-900 dark:text-dark-txt'
                                  : 'text-gray-700 dark:text-dark-txt-secondary',
                                'block w-full cursor-pointer px-4 py-2 text-left text-sm ',
                              )}
                            >
                              Current lecture
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-auto justify-center border dark:border-dark-border border-gray-700 dark:text-dark-txt dark:bg-dark-main bg-white px-4 py-2.5 text-sm font-black text-gray-700  hover:bg-gray-50">
                Sort by {orderQuestionsBy === 'most_likes' ? 'most upvoted' : 'most recent'}
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right dark:bg-dark-main bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {loading ? (
                    <div className="grid w-full place-items-center py-6 ">
                      <CircleLoader
                        className="items-center justify-center text-center"
                        loading
                        size={20}
                        color="#1c1d1f"
                      />
                    </div>
                  ) : (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => {
                              setOrderQuestionsBy('-created_at');
                            }}
                            className={classNames(
                              active
                                ? 'bg-gray-100 dark:bg-dark-second text-gray-900 dark:text-dark-txt'
                                : 'text-gray-700 dark:text-dark-txt-secondary',
                              'block w-full cursor-pointer px-4 py-2 text-left text-sm ',
                            )}
                          >
                            Most recent
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => {
                              setOrderQuestionsBy('most_likes');
                            }}
                            className={classNames(
                              active
                                ? 'bg-gray-100 dark:bg-dark-second text-gray-900 dark:text-dark-txt'
                                : 'text-gray-700 dark:text-dark-txt-secondary',
                              'block w-full cursor-pointer px-4 py-2 text-left text-sm ',
                            )}
                          >
                            Most upvoted
                          </button>
                        )}
                      </Menu.Item>
                    </>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center border dark:border-dark-border border-gray-700 dark:text-dark-txt dark:bg-dark-main bg-white px-4 py-2.5 text-sm font-black text-gray-700  hover:bg-gray-50">
                Filter by {filterQuestionsBy === 'user' && 'my questions'}
                {filterQuestionsBy === 'no_answer' && 'without answers'}
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right dark:bg-dark-main bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => {
                          setFilterQuestionsBy(null);
                        }}
                        className={classNames(
                          active
                            ? 'bg-gray-100 dark:bg-dark-second text-gray-900 dark:text-dark-txt'
                            : 'text-gray-700 dark:text-dark-txt-secondary',
                          'block w-full cursor-pointer px-4 py-2 text-left text-sm ',
                        )}
                      >
                        Show all questions
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => {
                          setFilterQuestionsBy('user');
                        }}
                        className={classNames(
                          active
                            ? 'bg-gray-100 dark:bg-dark-second text-gray-900 dark:text-dark-txt'
                            : 'text-gray-700 dark:text-dark-txt-secondary',
                          'block w-full cursor-pointer px-4 py-2 text-left text-sm ',
                        )}
                      >
                        Questions i asked
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => {
                          setFilterQuestionsBy('no_answer');
                        }}
                        className={classNames(
                          active
                            ? 'bg-gray-100 dark:bg-dark-second text-gray-900 dark:text-dark-txt'
                            : 'text-gray-700 dark:text-dark-txt-secondary',
                          'block w-full cursor-pointer px-4 py-2 text-left text-sm ',
                        )}
                      >
                        Questions without answers
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="pt-8 pb-4">
          {!episode?.id ? (
            <p className="text-lg font-black leading-6 dark:text-dark-txt text-gray-900">
              All questions in this course
            </p>
          ) : (
            <p className="text-lg font-black leading-6 dark:text-dark-txt text-gray-900">
              All questions in this lecture
            </p>
          )}
        </div>

        <ul className="">
          {loading ? (
            <div className="grid w-full place-items-center py-8">
              <CircleLoader
                className="items-center justify-center text-center"
                loading={loading}
                size={35}
                color="#1c1d1f"
              />
            </div>
          ) : (
            <>
              <QuestionsList
                questions={questions}
                currentPage={currentPage}
                pageSize={pageSize}
                maxPageSize={maxPageSize}
                setQuestions={setQuestions}
                setCount={setCount}
              />
              <br />
              {create ? (
                <div className="my-6 mb-4 w-full border border-gray-700 dark:border-dark-border dark:bg-dark-second bg-white py-4">
                  <form onSubmit={(e) => handleCreateQuestion(e)} className="grid grid-cols-12 ">
                    <h3 className="text-md col-span-2 ml-4 inline-flex font-bold leading-6 dark:text-dark-txt text-gray-900">
                      New question:{' '}
                    </h3>
                    <div className="relative col-span-10 w-full px-4">
                      <div>
                        <label className="block text-sm font-bold dark:text-dark-txt text-gray-900">
                          Title or summary
                        </label>
                        <div className="absolute right-0 mt-2.5 mr-6 dark:text-dark-txt-secondary text-gray-400">
                          {title.length} of 120
                        </div>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                          required
                          name="title"
                          className="text-md duration block dark:ring-dark-border dark:border-dark-border w-full border focus:ring-none focus:outline-none border-dark py-2.5 pl-4 font-medium transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="Enter a title"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-bold dark:text-dark-txt text-gray-900">
                          Details (optional)
                        </label>
                        <SimpleEditor
                          data={content}
                          setData={setContent}
                          maxLength={2400}
                          // placeholder="e.g. At 09:56, I don't understand this aprt, here is a screenshot and a code snippet."
                        />
                      </div>
                      <div className="float-right mt-4 flex space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setCreate(false);
                          }}
                          className="inline-flex cursor-pointer items-center border border-transparent px-4 py-2 text-sm font-medium text-black dark:text-dark-txt hover:bg-gray-50 dark:hover:bg-dark-second"
                        >
                          Cancel
                        </button>
                        {loading ? (
                          <div className="inline-flex items-center border border-transparent bg-black px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-gray-900">
                            <CircleLoader
                              loading={loading}
                              className="inline-flex"
                              size={20}
                              color="#ffffff"
                            />
                          </div>
                        ) : (
                          <button
                            type="submit"
                            className="inline-flex items-center border border-transparent bg-black dark:bg-dark-primary px-4 py-2 text-sm font-bold text-white  shadow-sm hover:bg-gray-900 dark:hover:bg-dark-accent"
                          >
                            Ask question
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                episode?.id && (
                  <button
                    type="button"
                    onClick={() => {
                      setCreate(true);
                    }}
                    className="my-4 text-lg font-bold"
                  >
                    Ask a new question
                  </button>
                )
              )}
              {questions && questions.length !== 0 && (
                <StandardPagination
                  data={questions}
                  count={count}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
