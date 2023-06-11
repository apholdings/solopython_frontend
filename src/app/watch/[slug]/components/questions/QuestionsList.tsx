'use client';

import { IQuestion } from '@/interfaces/courses/Question';
import QuestionItem from './QuestionItem';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface ComponentProps {
  questions: IQuestion[];
  currentPage: number;
  pageSize: number;
  maxPageSize: number;
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuestionsList({
  questions,
  currentPage,
  pageSize,
  maxPageSize,
  setQuestions,
  setCount,
}: ComponentProps) {
  return (
    <div>
      <div className="space-y-2">
        {questions?.length > 0 ? (
          questions?.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              currentPage={currentPage}
              pageSize={pageSize}
              maxPageSize={maxPageSize}
              setQuestions={setQuestions}
              setCount={setCount}
            />
          ))
        ) : (
          <div className="text-center">
            <QuestionMarkCircleIcon className="mx-auto h-12 w-12" />
            <h3 className="mt-2 text-sm font-medium dark:text-dark-txt text-gray-900">
              No Questions
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-dark-txt-secondary">
              Get started by asking a question.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
