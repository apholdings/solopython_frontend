'use client';

import { IAnswer } from '@/interfaces/courses/Answer';
import { IQuestion } from '@/interfaces/courses/Question';
import { fetchQuestionAnswers } from '@/utils/api/fetchQuestionAnswers';
import {
  ArrowUpCircleIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import AnswersList from '../answers/AnswersList';
import { Dialog, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import SimpleEditor from '@/components/SimpleEditor';
import CircleLoader from 'react-spinners/CircleLoader';
import DOMPurify from 'isomorphic-dompurify';

interface ComponentProps {
  question: IQuestion;
  currentPage: number;
  pageSize: number;
  maxPageSize: number;
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function QuestionItem({
  question,
  currentPage,
  pageSize,
  maxPageSize,
  setQuestions,
  setCount,
}: ComponentProps) {
  const { data: session } = useSession();

  const [edit, setEdit] = useState<boolean>(false);
  const [deleteQuestion, setDeleteQuestion] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [content, setContent] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
  });

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { title } = formData;

  const handleEditQuestion = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const body = JSON.stringify({
      title,
      content,
      question_id: question?.id,
      access: session?.user?.accessToken,
      currentPage,
      pageSize,
      maxPageSize,
    });
    const res = await fetch(`/api/courses/episodes/questions/edit/`, {
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
      setFormData({
        title: '',
      });
      setEdit(false);
    }

    setLoading(false);
  };

  const handleDeleteQuestion = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const body = JSON.stringify({
      question_id: question?.id,
      access: session?.user?.accessToken,
      currentPage,
      pageSize,
      maxPageSize,
    });
    const res = await fetch(`/api/courses/episodes/questions/delete/`, {
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
      setFormData({
        title: '',
      });
      setDeleteQuestion(false);
    }

    setLoading(false);
  };

  const [like, setLike] = useState(question?.likes.some((u) => u.user === session?.user?.id));

  const likeCount = question?.likes?.length;

  const [likes, setLikes] = useState(likeCount);

  const addLike = async () => {
    if (like) {
      setLike(false);
      const body = JSON.stringify({
        question_id: question?.id,
      });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/episode/questions/like/`,
        {
          cache: 'no-store',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${session?.user?.accessToken}`,
          },
          body,
        },
      );

      if (res.status === 200) {
        setLikes((previousState) => previousState - 1);
      }
    } else {
      setLike(true);
      const body = JSON.stringify({
        question_id: question?.id,
      });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/episode/questions/like/`,
        {
          cache: 'no-store',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${session?.user?.accessToken}`,
          },
          body,
        },
      );

      if (res.status === 200) {
        setLikes((previousState) => previousState + 1);
      }
    }
  };

  const [open, setOpen] = useState<boolean>(false);

  const [viewAnswers, setViewAnswers] = useState<boolean>(false);

  const [addAnswer, setAddAnswer] = useState<boolean>(false);
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  const handleCreateAnswer = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const body = JSON.stringify({
      content,
      question_id: question?.id,
      access: session?.user?.accessToken,
      currentPage,
      pageSize,
      maxPageSize,
    });

    try {
      const res = await fetch(`/api/courses/episodes/answers/create/`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const data = await res.json();

      if (res.status === 200) {
        setAnswers(data.results);
        setCount(data.count);
        setContent('');
        setAddAnswer(false);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="block dark:hover:bg-dark-main hover:bg-gray-100">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex-shrink-0">
              <img className="h-12 w-12 rounded-full" src={question?.user?.picture} alt="" />
            </div>
            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <div className=" truncate text-sm font-medium">{question?.user?.username}</div>
                <p className="mt-2 flex items-center space-x-1 text-gray-500">
                  <button
                    type="button"
                    className="cursor-pointer truncate text-xs dark:text-dark-accent text-purple-700 underline underline-offset-4 hover:text-purple-600"
                  >
                    Lecture {question?.episode?.number}
                  </button>

                  <span className="truncate text-xs">&middot;</span>
                  <span className="truncate text-xs dark:text-dark-txt-secondary">
                    {moment(question?.created_at).startOf('minute').fromNow()}
                  </span>
                </p>
              </div>
              <div className="hidden md:block">
                <div>
                  <p className=" text-sm font-bold dark:text-dark-txt text-gray-900">
                    <button
                      onClick={() => {
                        setViewAnswers(!viewAnswers);
                      }}
                      type="button"
                      className="cursor-pointer"
                    >
                      {question?.title}
                    </button>
                  </p>
                  {question?.correct_answer ? (
                    <p className="mt-2 flex items-center text-sm dark:text-dark-txt text-gray-500">
                      <CheckCircleIcon
                        className="text-green-400 mr-1.5 h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate ">Answered</span>
                    </p>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 space-y-1">
            <div className="flex">
              <span className="mr-2 text-lg font-bold dark:text-dark-txt-secondary">{likes}</span>
              <ArrowUpCircleIcon
                onClick={addLike}
                className={`${
                  like
                    ? 'text-purple-700 dark:text-dark-primary dark:hover:text-dark-txt hover:text-gray-600'
                    : 'text-gray-600 dark:text-dark-txt dark:hover:text-dark-primary hover:text-purple-700'
                }
                    h-6 w-6   cursor-pointer`}
              />
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="">
                    <EllipsisVerticalIcon className="ml-2 h-6 w-6 cursor-pointer dark:text-dark-txt text-gray-600 hover:text-purple-700" />
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y dark:bg-dark-bg dark:divide-dark-border divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {question?.user.id === session?.user.id && (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={() => {
                                  setEdit(true);
                                }}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 dark:bg-dark-main text-gray-900 dark:text-dark-txt'
                                    : 'dark:text-dark-txt-secondary text-gray-700',
                                  'group flex w-full items-center px-4 py-2 text-sm',
                                )}
                              >
                                <PencilIcon
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                Edit Question
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={() => {
                                  setOpen(true);
                                }}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 dark:bg-dark-main text-gray-900 dark:text-dark-txt'
                                    : 'dark:text-dark-txt-secondary text-gray-700',
                                  'group flex w-full items-center px-4 py-2 text-sm',
                                )}
                              >
                                <TrashIcon
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                Delete Question
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      )}
                      {question?.user.id !== session?.user.id && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm',
                              )}
                            >
                              <FlagIcon
                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              Report abuse
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="flex">
              <span className="mr-2 text-lg font-bold dark:text-dark-txt">
                {question?.get_answers_count}
              </span>
              <ChatBubbleLeftRightIcon
                onClick={() => {
                  setViewAnswers(!viewAnswers);
                }}
                className="mt-0.5 h-6 w-6 cursor-pointer text-gray-500"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {edit && (
          <div className="my-6 mb-4 w-full border dark:border-dark-second border-gray-700 dark:bg-dark-second bg-white py-4">
            <form onSubmit={(e) => handleEditQuestion(e)} className="grid grid-cols-12 ">
              <h3 className="text-md col-span-2 ml-4 inline-flex font-bold leading-6 dark:text-dark-txt text-gray-900">
                Edit question:{' '}
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
                      onChange(e);
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
                  <SimpleEditor data={content} setData={setContent} maxLength={2400} />
                </div>
                <div className="float-right mt-4 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setEdit(false)}
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
                      Save question
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}

        {/* {question?.correct_answer ? (
          <div className="px-4 pt-2 pb-4">
            <label className="mb-1 block text-sm font-black dark:text-dark-txt text-gray-700">
              Correct answer
            </label>
            <div className="flex ">
              <div className="mr-4  flex-shrink-0">
                <img
                  className="inline-block h-12 w-auto rounded-full"
                  src={question?.correct_answer?.user.picture}
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="flex items-center">
                  <div className="-ml-4 -mt-2  flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-2 ">
                      <div className=" text-md font-bold text-purple-700 underline underline-offset-2">
                        {question?.correct_answer?.user.username}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm ml-2 text-gray-600 dark:text-dark-txt-secondary">
                    {moment(question?.correct_answer?.created_date).fromNow()}
                  </p>
                </div>
                <p
                  className=" font-regular mt-1 dark:text-dark-txt-secondary text-sm"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(question && question.correct_answer.body),
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div />
        )} */}

        <div className=" pb-2 flex flex-wrap items-center justify-between px-4 sm:flex-nowrap">
          <div className="">
            <h3 className="text-md font-bold leading-6 dark:text-dark-txt text-gray-900">
              {question?.get_answers_count} Replies
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setAddAnswer(!addAnswer);
            }}
            className=" flex-shrink-0 font-bold"
          >
            Reply
          </button>
        </div>
      </div>

      {addAnswer ? (
        <div className="mb-4 w-full bg-white dark:bg-dark-second pb-4">
          <form onSubmit={(e) => handleCreateAnswer(e)} className="grid  ">
            <div className="relative w-full px-4 ">
              <div className="mt-4">
                <label className="mb-1 block text-sm font-black dark:text-dark-txt text-gray-700">
                  Write your response
                </label>
                <SimpleEditor data={content} setData={setContent} />
              </div>
              <div className="float-right mt-4 flex space-x-2">
                <div
                  onClick={() => {
                    setAddAnswer(!addAnswer);
                  }}
                  className="inline-flex cursor-pointer items-center border border-transparent px-4 py-2 text-sm font-medium text-black dark:text-dark-txt hover:bg-gray-50 dark:hover:bg-dark-second"
                >
                  Cancel
                </div>
                {loading ? (
                  <div className="inline-flex items-center border border-transparent bg-black px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-gray-900">
                    <CircleLoader loading className="inline-flex" size={20} color="#ffffff" />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center border border-transparent bg-black dark:bg-dark-primary px-4 py-2 text-sm font-bold text-white  shadow-sm hover:bg-gray-900 dark:hover:bg-dark-accent"
                  >
                    Add an answer
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div />
      )}

      {viewAnswers && <AnswersList question={question} answers={answers} setAnswers={setAnswers} />}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you wish to delete this question?
                        </p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleDeleteQuestion} className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark"
                      onClick={() => setOpen(false)}
                    >
                      Confirm
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
