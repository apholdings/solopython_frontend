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
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
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

export default function FeaturedMore() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className=" pt-5 ">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-2xl lg:text-3xl font-circular-medium leading-6 text-blue-500">
                Featured Articles
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <Button>See all articles</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl lg:max-w-7xl">
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {posts.map((post) => (
                <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <Link
                        href={`/categories/${post.category.href}`}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {post.category.title}
                      </Link>
                      <time dateTime={post.datetime} className="text-gray-500">
                        {post.date}
                      </time>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <Link href={`/blog/${post.href}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <Link href={`/blog/${post.href}`}>
                        <Button className="mt-2 bg-white border-2 hover:bg-gray-50 border-blue-500 ">
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
      </div>
    </div>
  );
}
