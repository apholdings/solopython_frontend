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
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Plataforma integral de aprendizaje
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Todo lo que necesitas para convertirte en un experto en Python y desarrollo Full Stack
            en un solo lugar. Aprovecha la flexibilidad de nuestros cursos online y aprende a tu
            propio ritmo.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name}>
              <dt className="font-semibold text-gray-900">{feature.name}</dt>
              <dd className="mt-1 text-gray-600">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
