import Button from '@/components/Button';

export default function Feature2() {
  return (
    <div className="overflow-hidden bg-white ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          {' '}
          {/* Added 'items-center' class */}
          <div className="flex items-start justify-start lg:order-last">
            {' '}
            {/* Updated classes */}
            <img
              src="/assets/img/placeholder/webdemo.png"
              alt="Product screenshot"
              className="w-[30rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[37rem]"
              width={2432}
              height={1442}
            />
          </div>
          <div className="lg:pr-4 lg:pt-4">
            {' '}
            {/* Updated classes */}
            <div className="lg:max-w-lg">
              <p className="mt-2 text-4xl font-circular-medium tracking-tight text-gray-900 sm:text-5xl">
                Crece
              </p>
              <p className="mt-6 text-lg font-circular-book leading-8 text-gray-600">
                En SoloPython nuestros cursos y programas están diseñados para proporcionarte una
                experiencia de aprendizaje práctica e interactiva.
              </p>
              <Button className="mt-8">Start free trial</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
