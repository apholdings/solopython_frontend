import Button from '@/components/Button';
import { IPost } from '@/interfaces/blog/Post';
import Link from 'next/link';

interface FeaturedProps {
  posts: IPost[];
}

const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
];

export default function Recommended() {
  return (
    <div className="bg-blue-100 bg-opacity-10 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className=" py-5 ">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-2xl lg:text-3xl font-circular-medium leading-6 text-blue-500">
                Grow Your Business
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <Button>See all articles</Button>
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="aspect-[16/9] h-56 w-full rounded bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
              </div>
              <div className="max-w-xl">
                <div className="mt-4 flex items-center gap-x-4 text-sm">
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full  font-circular-book text-blue-600"
                  >
                    {post.category.title}
                  </a>
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg  leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href} className="font-circular-medium">
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <Link href={`/blog/${post.href}`} className="">
                    <Button className="mt-8 bg-white border-2 hover:bg-gray-50 border-blue-500 ">
                      <span className="text-blue-500 font-circular-medium">Read More</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
