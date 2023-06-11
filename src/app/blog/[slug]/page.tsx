import {
  ArrowLeftIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { Metadata, ResolvingMetadata } from 'next';
import EmailForm from '../components/EmailForm';
import ReturnToPosts from './components/ReturnToPosts';

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/blog/posts/get/?slug=${params?.slug}`,
    {
      method: 'GET',
      cache: 'no-cache',
    },
  );
  const data = await res.json();
  const post = data.results.post;

  return {
    title: post?.title,
    description: post?.description,
    keywords: post?.keywords,
    openGraph: {
      images: [post?.thumbnail],
    },
  };
}

export default async function Page({ params }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/blog/posts/get/?slug=${params?.slug}`,
    {
      method: 'GET',
      cache: 'no-cache',
    },
  );
  const data = await res.json();
  const post = data.results.post;
  const headings = data.results.headings;
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto border-b border-gray-200 max-w-7xl px-6 lg:px-8 py-10">
        <div className="mx-auto max-w-4xl lg:max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7  m-2 p-8">
              <ReturnToPosts />
              <h3 className="text-2xl my-6 lg:text-4xl font-circular-bold ">{post?.title}</h3>
              <Link
                href={`/categories/${post?.category?.slug}`}
                className="mt-4 text-md font-circular-medium text-blue-500 text-md "
              >
                Category: {post?.category?.name}
              </Link>
            </div>
            <div className="col-span-5 m-2 rounded p-6">
              <img src={post?.thumbnail} className="object-cover w-auto h-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap relative">
        <div className="w-1/4 sticky top-32 h-full">
          <div className="col-span-5 bg-light-gray m-2 rounded p-6">
            <h1 className="text-xl font-circular-medium mb-2">Table of contents</h1>
            <ul className="space-y-2">
              {headings?.map((heading) => (
                <>
                  <li className="cursor-pointer hover:text-blue-500 font-circular-medium text-gray-500">
                    {heading.title}
                  </li>
                  <div className="w-full border-b border-gray-300 my-2" />
                </>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-1/2 px-2">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <p className="mt-6 text-xl font-circular-book leading-8">{post?.description}</p>
            <h1 className="mt-8 text-3xl font-circular-bold tracking-tight text-blue-500 sm:text-4xl">
              {post?.title}
            </h1>
            <div className="mt-10 max-w-2xl">
              <div
                className="font-circular-light text-lg"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.content) }}
              />
              <p>
                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis
                mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio
                penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa
                rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                vitae sed turpis id.
              </p>
              <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">Data types.</strong> Lorem
                    ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
                    suscipit eaque, iste dolor cupiditate blanditiis ratione.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">Loops.</strong> Anim aute id
                    magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">Events.</strong> Ac tincidunt
                    sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id
                blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel.
                Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac
                tempor et ut. Ac lorem vel integer orci.
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/4 sticky top-20 h-full">
          <div className="col-span-5 bg-blue-500 m-2 rounded p-6">
            <EnvelopeIcon className="h-6 w-auto text-white mb-4" />
            <h3 className="text-2xl font-semibold leading-6 text-white">Stay in the loop</h3>
            <p className="mt-4 text-md font-circular-light text-lg text-gray-100">
              Get free expert insights and tips to grow your knowledge business sent right to your
              inbox.{' '}
            </p>
            <EmailForm />
            <p className="text-xs font-circular-light text-white leading-normal mt-2">
              By submitting you agree to receive our monthly Knowledge Economy Newsletter as well as
              other promotional emails from Kajabi. You may withdraw your consent at any time via
              the “Unsubscribe” link in any email or view our privacy policy at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
