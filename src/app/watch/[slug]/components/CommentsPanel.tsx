'use client';

import SimpleEditor from '@/components/SimpleEditor';
import { useCallback, useEffect, useState } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import CommentItem from './CommentItem';
import { IEpisode } from '@/interfaces/courses/Episode';
import { useSession } from 'next-auth/react';
import { IComment } from '@/interfaces/courses/Comment';
import StandardPagination from '@/components/pagination/StandardPagination';

interface ComponentProps {
  episode: IEpisode;
}

export default function CommentsPanel({ episode }: ComponentProps) {
  const { data: session } = useSession();

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(episode.length | 0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [maxPageSize, setMaxpageSize] = useState(100);

  const [comments, setComments] = useState<IComment[]>([]);

  const fetchComments = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/episode/comment/list/?p=${currentPage}&page_size=${pageSize}&max_page_size=${maxPageSize}&episode=${episode?.id}`,
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
      setComments(data.results);
      setCount(data.count);
    }
  }, [currentPage, pageSize, maxPageSize, episode]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCreateComment = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const body = JSON.stringify({
      content,
      episode_id: episode?.id,
      access: session?.user?.accessToken,
      currentPage,
      pageSize,
      maxPageSize,
    });
    const res = await fetch(`/api/courses/episodes/comments/create/`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    const data = await res.json();

    if (res.status === 200) {
      setComments(data.results);
      setCount(data.count);
      setContent('');
    }

    setLoading(false);
  };

  return (
    <div className="py-6">
      <SimpleEditor
        data={content}
        setData={setContent}
        maxLength={2400}
        // placeholder="e.g. At 09:56, I don't understand this aprt, here is a screenshot and a code snippet."
      />
      <div className="float-right mt-4 flex space-x-2">
        {loading ? (
          <div className="inline-flex items-center border border-transparent bg-black px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-gray-900">
            <CircleLoader loading className="inline-flex" size={20} color="#ffffff" />
          </div>
        ) : (
          <button
            type="submit"
            onClick={handleCreateComment}
            className="inline-flex items-center border border-transparent bg-black dark:bg-dark-primary px-4 py-2 text-sm font-bold text-white  shadow-sm hover:bg-gray-900 dark:hover:bg-dark-accent"
          >
            Comment
          </button>
        )}
      </div>

      <div className="mt-16 border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-xl font-semiboldleading-6 text-gray-900">
          Comments ({comments?.length})
        </h3>
        <div className="mt-3 font-semibold text-2xl sm:ml-4 sm:mt-0"></div>
      </div>

      <ul role="list" className="divide-y divide-gray-200">
        {comments?.length > 0 &&
          comments.map((comment) => (
            <li key={comment.id} className="px-4 py-4 sm:px-0">
              {/* Your content */}
              <CommentItem
                comment={comment}
                setComments={setComments}
                setCount={setCount}
                currentPage={currentPage}
                pageSize={pageSize}
                maxPageSize={maxPageSize}
              />
            </li>
          ))}
        {comments?.length > 0 && (
          <StandardPagination
            data={comments}
            count={count}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </ul>
    </div>
  );
}
