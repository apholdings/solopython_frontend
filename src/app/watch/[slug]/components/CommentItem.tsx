'use client';

import SimpleEditor from '@/components/SimpleEditor';
import { IComment } from '@/interfaces/courses/Comment';
import DOMPurify from 'isomorphic-dompurify';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

interface CommentItemProps {
  comment: IComment;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  pageSize: number;
  maxPageSize: number;
}

export default function CommentItem({
  comment,
  setComments,
  setCount,
  currentPage,
  pageSize,
  maxPageSize,
}: CommentItemProps) {
  const { data: session } = useSession();

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const [edit, setEdit] = useState<boolean>(false);

  const [deleteComment, setDeleteComment] = useState<boolean>(false);

  const handleEditComment = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const body = JSON.stringify({
      content,
      comment_id: comment?.id,
      access: session?.user?.accessToken,
      currentPage,
      pageSize,
      maxPageSize,
    });
    const res = await fetch(`/api/courses/episodes/comments/edit/`, {
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
      setEdit(false);
    }

    setLoading(false);
  };

  const handleDeleteComment = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const body = JSON.stringify({
      comment_id: comment?.id,
      access: session?.user?.accessToken,
      currentPage,
      pageSize,
      maxPageSize,
    });
    const res = await fetch(`/api/courses/episodes/comments/delete/`, {
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
      setDeleteComment(false);
    }

    setLoading(false);
  };

  return (
    <div className="sm:flex">
      <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
        <img className="inline-block h-14 w-14 rounded-md" src={comment?.user?.picture} alt="" />
      </div>
      <div className="w-full">
        <div className="flex items-center">
          <h4 className="text-lg font-bold">{comment?.user?.username}</h4>
          {session?.user.email === comment?.user?.email && (
            <button
              onClick={() => {
                setEdit(!edit);
              }}
              className="ml-2"
            >
              {edit ? 'Cancel' : 'Edit'}
            </button>
          )}
          {session?.user.email === comment?.user?.email && (
            <button
              onClick={() => {
                setDeleteComment(!deleteComment);
              }}
              className="ml-2"
            >
              Delete
            </button>
          )}
        </div>
        {edit ? (
          <div className="py-2">
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
                  onClick={handleEditComment}
                  className="inline-flex items-center border border-transparent bg-black dark:bg-dark-primary px-4 py-2 text-sm font-bold text-white  shadow-sm hover:bg-gray-900 dark:hover:bg-dark-accent"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        ) : deleteComment ? (
          <div className="py-2">
            Are you sure about that?
            <div className="float-right mt-4 flex space-x-2">
              {loading ? (
                <div className="inline-flex items-center border border-transparent bg-black px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-gray-900">
                  <CircleLoader loading className="inline-flex" size={20} color="#ffffff" />
                </div>
              ) : (
                <button
                  type="submit"
                  onClick={handleDeleteComment}
                  className="inline-flex items-center border border-transparent bg-black dark:bg-dark-primary px-4 py-2 text-sm font-bold text-white  shadow-sm hover:bg-gray-900 dark:hover:bg-dark-accent"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ) : (
          <p
            className="mt-1"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment?.body) }}
          />
        )}
      </div>
    </div>
  );
}
