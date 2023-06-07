'use client';

import { ISection } from '@/interfaces/courses/Section';
import React from 'react';
import SectionItem from './SectionItem';
import { IQuestion } from '@/interfaces/courses/Question';
import { IEpisode } from '@/interfaces/courses/Episode';

interface SectionsListProps {
  sections: ISection[];
  file: string;
  setFile: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  questions: IQuestion[]; // Replace 'any' with the appropriate type for 'questions'
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>; // Replace 'any' with the appropriate type for 'questions'
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setEpisode: React.Dispatch<React.SetStateAction<IEpisode | null>>;
  episode_id: string;
  setEpisodeId: React.Dispatch<React.SetStateAction<string>>;
}

export default function SectionsList({
  sections,
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
}: SectionsListProps) {
  return (
    <ul role="list" className="-mx-2 space-y-1">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between p-4 sm:flex-nowrap">
        <div className=" mt-2">
          <p className="text-md font-bold leading-6 dark:text-dark-txt text-gray-900">
            Course content
          </p>
        </div>
      </div>
      {sections?.map((section, idx) => {
        return (
          <SectionItem
            section={section}
            file={file}
            setFile={setFile}
            content={content}
            setContent={setContent}
            questions={questions}
            setQuestions={setQuestions}
            description={description}
            setDescription={setDescription}
            key={idx}
            setEpisode={setEpisode}
            episode_id={episode_id}
            setEpisodeId={setEpisodeId}
          />
        );
      })}
    </ul>
  );
}
