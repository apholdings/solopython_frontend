import Button from '@/components/Button';

const features = [
  {
    name: 'Desarrollo Full Stack.',
    description:
      'Domina tanto el backend como el frontend, convirtiéndote en un desarrollador versátil y en demanda.',
  },
  {
    name: 'Django y Python.',
    description:
      'Aprende a usar Django, uno de los frameworks de Python más populares, para desarrollar aplicaciones web robustas.',
  },
  {
    name: 'Hacking ético.',
    description:
      'Introdúcete en el emocionante mundo del hacking ético y aprende a proteger sistemas y redes.',
  },
  {
    name: 'Ecommerce y criptomonedas.',
    description:
      'Aprende a desarrollar plataformas de ecommerce y a entender y dominar el mundo de las criptomonedas.',
  },
  {
    name: 'Desarrollo blockchain.',
    description:
      'Entiende y domina el desarrollo blockchain, una de las tecnologías más prometedoras y en demanda de la actualidad.',
  },
  {
    name: 'Dominio del frontend.',
    description:
      'Aprende a crear interfaces de usuario atractivas y efectivas, y proporciona una excelente experiencia de usuario.',
  },
];

export default function Feature3() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          {' '}
          {/* Added 'items-center' class */}
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-4xl font-circular-medium tracking-tight text-gray-900 sm:text-5xl">
                Trabaja
              </p>
              <p className="mt-6 text-lg font-circular-book leading-8 text-gray-600">
                En SoloPython nuestros cursos y programas están diseñados para proporcionarte una
                experiencia de aprendizaje práctica e interactiva.
              </p>
              <Button className="mt-8">Start free trial</Button>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <img
              src="/assets/img/placeholder/webdemo.png"
              alt="Product screenshot"
              className="w-[30rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[37rem]"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
