import { PlayIcon, Cog6ToothIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Aprendizaje interactivo',
    description:
      'Nuestros cursos están diseñados para mantener a los estudiantes comprometidos con ejercicios y proyectos prácticos.',
    href: '#',
    icon: PlayIcon,
  },
  {
    name: 'Soporte constante',
    description:
      'Nuestro equipo de profesionales está siempre dispuesto a ayudarte en tu viaje de aprendizaje.',
    href: '#',
    icon: Cog6ToothIcon,
  },
  {
    name: 'Comunidad vibrante',
    description:
      'Únete a nuestra comunidad de más de 120k suscriptores en YouTube y interactúa con otros estudiantes apasionados por Python.',
    href: '#',
    icon: UserGroupIcon,
  },
];

export default function Feature2() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Conviértete en un desarrollador Full Stack con SoloPython
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Domina Python y Django, aprende hacking ético, crea plataformas de ecommerce, domina el
            mundo de las criptomonedas, el desarrollo blockchain y el frontend. Todo esto con el
            respaldo de nuestra vasta experiencia y nuestro compromiso con la enseñanza de alta
            calidad.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-indigo-600"
                    >
                      Aprende más <span aria-hidden="true">→</span>
                    </a>
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
