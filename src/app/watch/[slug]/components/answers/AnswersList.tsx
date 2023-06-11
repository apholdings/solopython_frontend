'use client';

import { IQuestion } from '@/interfaces/courses/Question';
import AnswerItem from './AnswerItem';
import { IAnswer } from '@/interfaces/courses/Answer';
import { useCallback, useEffect, useState } from 'react';
import SimpleEditor from '@/components/SimpleEditor';
import CircleLoader from 'react-spinners/CircleLoader';
import { useSession } from 'next-auth/react';
import StandardPagination from '@/components/pagination/StandardPagination';

interface AnswersListProps {
  question: IQuestion;
  answers: IAnswer[];
  setAnswers: React.Dispatch<React.SetStateAction<IAnswer[]>>;
}

export default function AnswersList({ question, answers, setAnswers }: AnswersListProps) {
  const { data: session } = useSession();

  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [maxPageSize, setMaxpageSize] = useState(100);

  const fetchAnswers = useCallback(
    async (page: number, search: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/episode/questions/answers/list/?p=${page}&page_size=${pageSize}&max_page_size=${maxPageSize}&question=${question?.id}&search=${search}`,
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
        setAnswers(data.results);
        setCount(data.count);
      }
    },
    [pageSize, maxPageSize, question],
  );

  useEffect(() => {
    fetchAnswers(currentPage, '');
  }, [fetchAnswers]);

  return (
    <div>
      <div className="space-y-4 my-4">
        {answers?.length > 0 &&
          answers.map((answer) => (
            <AnswerItem
              key={answer.id}
              answer={answer}
              currentPage={currentPage}
              pageSize={pageSize}
              maxPageSize={maxPageSize}
              setAnswers={setAnswers}
              setCount={setCount}
            />
          ))}
      </div>
      {answers && answers.length !== 0 && (
        <div className="mt-4">
          <StandardPagination
            data={answers}
            count={count}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
