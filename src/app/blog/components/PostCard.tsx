'use client';

import { IPost } from '@/interfaces/blog/Post';
import Link from 'next/link';
import moment from 'moment';
import Button from '@/components/Button';

export default function PostCard({ post }: { post: IPost }) {
  return (
    <article key={post.slug} className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <img
          src={post.thumbnail}
          alt=""
          className="aspect-[16/9] h-56 w-full rounded bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
      </div>
      <div className="max-w-xl">
        <div className="mt-4 flex items-center gap-x-4 text-sm">
          <Link
            href={`/categories/${post.category.slug}`}
            className="relative z-10 rounded-full  font-circular-book text-blue-600"
          >
            {post.category.name}
          </Link>
          <time dateTime={post.published} className="text-gray-500">
            {moment(post.published).calendar()}
          </time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg  leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={`/blog/${post.slug}`} className="font-circular-medium">
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <Link href={`/blog/${post.slug}`} className="">
            <Button className="mt-8 bg-white border-2 hover:bg-gray-50 border-blue-500 ">
              <span className="text-blue-500 font-circular-medium">Read More</span>
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
