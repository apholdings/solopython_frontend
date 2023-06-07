'use client';

import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FolderOpenIcon, PlayCircleIcon } from '@heroicons/react/24/solid';

import { IEpisode } from '@/interfaces/courses/Episode';
import { IQuestion } from '@/interfaces/courses/Question';
import { DocumentIcon } from '@heroicons/react/20/solid';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface EpisodeItemProps {
  episode: IEpisode;
  file: string;
  setFile: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setEpisode: React.Dispatch<React.SetStateAction<IEpisode | null>>;
  episode_id: string;
  setEpisodeId: React.Dispatch<React.SetStateAction<string>>;
}

export default function EpisodeItem({
  episode,
  setFile,
  setContent,
  setQuestions,
  setDescription,
  setEpisode,
  episode_id,
  setEpisodeId,
}: EpisodeItemProps) {
  const [viewedEpisode, setViewedEpisode] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    //   setVideoHidden(false);
    //   setQuestionHidden(true);
    //   setResourceHidden(true);
    window.scrollTo(0, 0);
    setEpisode(episode);
    setFile(episode?.file);
    setEpisodeId(episode?.id);
    setContent(episode?.content);
    setQuestions(episode?.questions);
    setDescription(episode?.description);
  };

  const handleViewedEpisode = async () => {
    setViewedEpisode(true);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`
        ${episode_id == episode?.id ? 'bg-gray-200 dark:bg-dark-third' : ''}
        hover:bg-watchlist-hover flex cursor-pointer items-center justify-between px-3 py-3 hover:bg-gray-200 dark:hover:bg-dark-third `}
      >
        <div className="-mx-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <div className="flex w-full">
              <div
                className="flex-shrink-0"
                onClick={() => {
                  handleViewedEpisode();
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <i className={`bx bx-checkbox text-3xl ${hovered ? 'text-gray-400' : ''}`} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-6 mt-4">
              <p className="truncate text-sm font-medium leading-6 dark:text-dark-txt text-gray-900">
                {episode?.number}. {episode?.title}
              </p>

              <div className="text-sm text-gray-500 flex">
                {episode?.file ? (
                  <PlayCircleIcon className="inline-flex h-4 w-4 dark:text-dark-txt-secondary text-gray-500" />
                ) : (
                  <DocumentIcon className="inline-flex h-4 w-4 dark:text-dark-txt-secondary text-gray-500" />
                )}
                {episode?.file ? (
                  <div className="ml-1 inline-flex text-xs"> {episode?.length}min</div>
                ) : (
                  <div className="ml-1 inline-flex text-xs"> Article</div>
                )}
              </div>
            </div>
            <div className=" mt-4 flex-shrink-0">
              {episode?.resources.length > 0 && (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="focus:ring-indigo-500 inline-flex w-full justify-center border border-gray-700 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:bg-dark-bg dark:border-dark-border dark:text-dark-txt dark:hover:bg-dark-second dark:focus:ring-offset-dark-main">
                      <FolderOpenIcon className="-ml-1 mr-1 h-4 w-4" aria-hidden="true" />
                      Resources
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right dark:bg-dark-bg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {episode?.resources?.length !== 0 ? (
                          episode?.resources.map((resource, index) => (
                            <Menu.Item key={index}>
                              {({ active }) => (
                                <>
                                  {resource.url ? (
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 dark:text-dark-txt text-gray-900'
                                          : 'text-gray-700 dark:text-dark-txt-secondary dark:hover:bg-dark-third hover:bg-gray-50',
                                        'block px-4 py-2 text-sm',
                                      )}
                                    >
                                      {resource.title}
                                    </a>
                                  ) : (
                                    <a
                                      href={resource.file}
                                      download
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 dark:text-dark-txt text-gray-900'
                                          : 'text-gray-700 dark:text-dark-txt-secondary dark:hover:bg-dark-third hover:bg-gray-50',
                                        'block px-4 py-2 text-sm',
                                      )}
                                    >
                                      {resource.title}
                                    </a>
                                  )}
                                  <div />
                                </>
                              )}
                            </Menu.Item>
                          ))
                        ) : (
                          <div />
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
