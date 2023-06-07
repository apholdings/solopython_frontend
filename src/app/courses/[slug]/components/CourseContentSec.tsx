import { ISection } from '@/interfaces/courses/Section';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import ContentList from './ContentList';

interface Props {
  section: ISection;
}

export default function CourseContentSec({ section }: Props) {
  const [hidden, setHidden] = useState(true);

  const changeHidden = () => {
    setHidden(!hidden);
  };

  return (
    <div>
      <button
        type="button"
        onClick={changeHidden}
        className="bg-gray-section flex w-full cursor-pointer items-center justify-between border border-gray-300 p-2 pr-5 py-4 dark:hover:bg-dark-third hover:bg-gray-100 dark:border-dark-third   dark:bg-dark-second"
      >
        <div className="flex w-full items-center overflow-hidden ">
          <div className="mr-2 flex items-center justify-center text-xl">
            {hidden ? (
              <ChevronUpIcon
                className="mx-3 h-3.5 w-3.5 text-gray-700 dark:text-dark-txt-secondary"
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className="mx-3 h-3.5 w-3.5 text-gray-700 dark:text-dark-txt-secondary"
                aria-hidden="true"
              />
            )}
          </div>
          <div>
            <p className="font-bold dark:text-dark-txt md:text-lg">
              {section ? section.title : <div />}
            </p>
          </div>
          <div className="ml-auto">
            {section ? (
              <p className="inline-flex text-sm text-gray-700 dark:text-dark-txt-secondary">
                {section?.episodes?.length} lecture{section?.episodes?.length > 1 && 's'} &middot;{' '}
                {section?.total_duration}
              </p>
            ) : (
              <div />
            )}
          </div>
        </div>
      </button>
      {section ? (
        <ContentList section={section} episodes={section.episodes} hidden={hidden} />
      ) : (
        <div />
      )}
    </div>
  );
}
