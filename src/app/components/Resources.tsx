'use client';

import { InboxIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const features = [
  {
    id: 1,
    name: 'Unlimited inboxes',
    description:
      'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia.',
    href: '#',
    icon: InboxIcon,
  },
  {
    id: 2,
    name: 'Manage team members',
    description:
      'Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt.',
    href: '#',
    icon: UsersIcon,
  },
  {
    id: 3,
    name: 'Spam report',
    description:
      'Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et dolorem. ',
    href: '#',
    icon: TrashIcon,
  },
  {
    id: 4,
    name: 'Unlimited inboxes',
    description:
      'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia.',
    href: '#',
    icon: InboxIcon,
  },
  {
    id: 5,
    name: 'Manage team members',
    description:
      'Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt.',
    href: '#',
    icon: UsersIcon,
  },
  {
    id: 6,
    name: 'Spam report',
    description:
      'Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et dolorem. ',
    href: '#',
    icon: TrashIcon,
  },
];

export default function Resources() {
  const router = useRouter();
  return (
    <div className="bg-blue-500 py-24 sm:py-24 mt-12">
      <div className="mx-auto max-w-7xl ">
        <div className="mx-auto max-w-full lg:mx-0">
          <h2 className="text-4xl font-circular-bold tracking-tight text-white sm:text-6xl">
            Resources to help you earn more
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col">
                <dt className="text-3xl font-circular-bold leading-7 text-white">{feature.name}</dt>
                <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-gray-50">
                  <p className="flex-auto text-lg font-circular-book">{feature.description}</p>
                  <p className="mt-10">
                    <button
                      type="button"
                      onClick={() => {
                        router.push(feature.href);
                      }}
                      className="transition duration-300 ease-in-out scale-100 hover:scale-105 text-md font-semibold leading-6 rounded-lg px-8 py-3 border-2 border-white font-circular-book text-white "
                    >
                      Learn more
                    </button>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
