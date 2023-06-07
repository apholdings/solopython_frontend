import { PlayIcon, UserGroupIcon, BriefcaseIcon } from '@heroicons/react/20/solid';

const features = [
  {
    name: 'Aprendizaje interactivo.',
    description:
      'Cada concepto en nuestros cursos se enseña a través de ejemplos prácticos y proyectos reales para que puedas aplicar lo que aprendes desde el primer día.',
    icon: PlayIcon,
  },
  {
    name: 'Comunidad de apoyo.',
    description:
      'Forma parte de una comunidad vibrante de programadores y recibe ayuda y soporte de tus compañeros y mentores.',
    icon: UserGroupIcon,
  },
  {
    name: 'Orientado a la carrera.',
    description:
      'Nuestros cursos están diseñados con la industria en mente, por lo que aprenderás las habilidades que los empleadores realmente valoran.',
    icon: BriefcaseIcon,
  },
];

export default function Feature1() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Aprendizaje con enfoque práctico
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                En SoloPython, creemos que la mejor manera de aprender es haciendo. Nuestros cursos
                y programas están diseñados para proporcionarte una experiencia de aprendizaje
                práctica e interactiva.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <img
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
