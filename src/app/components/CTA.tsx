import Link from 'next/link';

export default function CTA() {
  return (
    <div className="bg-indigo-100">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          ¿Listo para emprender tu viaje en Python?
          <br />
          Inicia tu prueba gratuita hoy mismo.
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <Link
            href="/courses"
            className="rounded-full bg-blue-600 px-4 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Explora nuestros cursos
          </Link>
          <Link href="#" className="text-md font-semibold leading-6 text-gray-900">
            Consulta nuestros precios <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
