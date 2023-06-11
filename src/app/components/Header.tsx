import { AdjustmentsHorizontalIcon, PencilIcon, XCircleIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';

const items = [
  {
    id: 1,
    text: 'All the tools you need in one place',
    icon: PencilIcon,
  },
  {
    id: 2,
    text: 'No need to be tech-savvy',
    icon: AdjustmentsHorizontalIcon,
  },
  {
    id: 3,
    text: '0% revenue fees',
    icon: XCircleIcon,
  },
  // More items...
];

export default function Header() {
  return (
    <div className="bg-white dark:bg-dark-bg">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-yellow-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-24">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-28 lg:mt-4 text-5xl font-circular-bold  text-gray-900 sm:text-6xl lg:text-7xl">
                  Tus destrezas valen mas en SoloPython.
                </h1>
                <p className="my-6 text-lg font-circular-bold leading-8 text-gray-400">
                  ¡Desata tu potencial y conviértete en un maestro nómada del código con SoloPython
                  y el Bootcamp de Eric!
                </p>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="px-4 flex text-md font-circular-medium items-center text-blue-500 sm:px-0"
                    >
                      <item.icon className="h-5 w-auto mr-3" />
                      {item.text}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/courses"
                    className="rounded-lg scale-100 hover:scale-105 transition duration-300 ease-in-out bg-blue-500 px-8 py-3 text-lg font-circular-medium text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Start your 14-day free trial
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-32 sm:mt-28 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-12 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-yellow-600/10 ring-1 ring-blue-50 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-blue-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-blue-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-circular-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            Navbar.tsx
                          </div>
                          <div className="border-r border-gray-600/10 px-4 py-2">Aprender.py</div>
                        </div>
                      </div>
                      <div className="px-6 pb-14 pt-6">
                        <code className="text-gray-300">
                          <span className="text-pink-300">def</span>{' '}
                          <span className="text-blue-400">
                            aprender_python<span className="text-yellow-400">()</span>
                          </span>
                          :
                          <br />
                          &nbsp;&nbsp;step_1 <span className="text-cyan-200">=</span>{' '}
                          <span className="text-cyan-200">'</span>
                          <span className="text-green-300">Inscribete en SoloPython.</span>
                          <span className="text-cyan-200">'</span>
                          <br />
                          &nbsp;&nbsp;step_2 <span className="text-cyan-200">=</span>{' '}
                          <span className="text-cyan-200">'</span>
                          <span className="text-green-300">
                            Comienza con nuestros cursos básicos.
                          </span>
                          <span className="text-cyan-200">'</span>
                          <br />
                          &nbsp;&nbsp;step_3 <span className="text-cyan-200">=</span>{' '}
                          <span className="text-cyan-200">'</span>
                          <span className="text-green-300">
                            Practica con problemas y proyectos.
                          </span>
                          <span className="text-cyan-200">'</span>
                          <br />
                          &nbsp;&nbsp;step_4 <span className="text-cyan-200">=</span>{' '}
                          <span className="text-cyan-200">'</span>
                          <span className="text-green-300">
                            Únete a nuestra comunidad y comparte tu progreso.
                          </span>
                          <span className="text-cyan-200">'</span>
                          <br />
                          &nbsp;&nbsp;step_5 <span className="text-cyan-200">=</span>{' '}
                          <span className="text-cyan-200">'</span>
                          <span className="text-green-300">Sigue aprendiendo y divirtiéndote.</span>
                          <span className="text-cyan-200">'</span>
                          <br />
                          <br />
                          &nbsp;&nbsp;<span className="text-blue-400">print</span>
                          <span className="text-yellow-400">(</span>step_1
                          <span className="text-yellow-400">)</span>
                          <br />
                          &nbsp;&nbsp;<span className="text-blue-400">print</span>
                          <span className="text-yellow-400">(</span>step_2
                          <span className="text-yellow-400">)</span>
                          <br />
                          &nbsp;&nbsp;<span className="text-blue-400">print</span>
                          <span className="text-yellow-400">(</span>step_3
                          <span className="text-yellow-400">)</span>
                          <br />
                          &nbsp;&nbsp;<span className="text-blue-400">print</span>
                          <span className="text-yellow-400">(</span>step_4
                          <span className="text-yellow-400">)</span>
                          <br />
                          &nbsp;&nbsp;<span className="text-blue-400">print</span>
                          <span className="text-yellow-400">(</span>step_5
                          <span className="text-yellow-400">)</span>
                          <br />
                          <br />
                          <span className="text-blue-400">
                            aprender_python<span className="text-yellow-400">()</span>
                          </span>
                        </code>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
}
