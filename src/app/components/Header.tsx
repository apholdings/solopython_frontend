import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="bg-white dark:bg-dark-bg">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-yellow-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Potencia tus habilidades
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  En SoloPython, transformamos tu pasión por la programación en habilidades reales.
                  A través de nuestros cursos, academias, entrenamientos y consultorías, te guiamos
                  paso a paso hasta que te conviertas en un experto en Python. ¡Únete a nosotros y
                  comienza tu viaje en Python hoy!
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/courses"
                    className="rounded-full bg-yellow-500 px-4 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Explorar Cursos
                  </Link>
                  <Link
                    href="/academies"
                    className="flex text-sm font-semibold items-center leading-6 text-gray-900"
                  >
                    Ver Academia <ChevronRightIcon className="h-4 text-gray-400 mt-0.5 w-auto" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
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
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
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
