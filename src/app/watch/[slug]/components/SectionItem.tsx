'use client';

import { IQuestion } from '@/interfaces/courses/Question';
import { ISection } from '@/interfaces/courses/Section';
import { useState } from 'react';
import EpisodeItem from './EpisodeItem';
import { IEpisode } from '@/interfaces/courses/Episode';

interface SectionItemProps {
  section: ISection;
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

export default function SectionItem({
  section,
  file,
  setFile,
  content,
  setContent,
  questions,
  setQuestions,
  description,
  setDescription,
  setEpisode,
  episode_id,
  setEpisodeId,
}: SectionItemProps) {
  const [hidden, setHidden] = useState(true);

  const handleHidden = () => {
    setHidden(!hidden);
  };

  return (
    <li key={section.id}>
      <div
        onClick={handleHidden}
        className="-mx-4 flex cursor-pointer flex-wrap items-center justify-between dark:hover:bg-dark-third dark:bg-dark-bg bg-gray-50 p-3 sm:flex-nowrap"
      >
        <div className="ml-4 ">
          <p className="text-sm font-extrabold leading-6 dark:text-dark-txt text-gray-900">
            Section {section?.number}: {section?.title}
          </p>
          <p className="mt-1 text-xs dark:text-dark-txt-secondary text-gray-500">
            0/{section?.episodes?.length} | {section?.total_duration}
          </p>
        </div>
        <div className="ml-4  flex-shrink-0">
          {hidden ? (
            <i className="bx bx-chevron-up text-2xl dark:text-dark-txt-secondary text-gray-900" />
          ) : (
            <i className="bx bx-chevron-down text-2xl dark:text-dark-txt-secondary text-gray-900" />
          )}
        </div>
      </div>
      <div className={`${hidden ? ' hidden' : '  '} -mx-4`}>
        {section?.episodes?.map((data) => (
          <EpisodeItem
            key={data.id}
            file={file}
            setFile={setFile}
            content={content}
            setContent={setContent}
            questions={questions}
            setQuestions={setQuestions}
            description={description}
            setDescription={setDescription}
            episode={data}
            setEpisode={setEpisode}
            episode_id={episode_id}
            setEpisodeId={setEpisodeId}
          />
        ))}
      </div>
    </li>
  );
}
