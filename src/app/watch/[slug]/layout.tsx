import Head from 'next/head';
import ContextProvider from './components/ContextProvider';
import Providers from './components/Providers';

export const metadata = {
  title: 'Watch - ',
  description:
    'Cursos interactivos y de alta calidad para aprender Python. Únete a nuestra academia y transforma tu carrera en programación, sin importar tu nivel de experiencia.',
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/get/${params?.slug}`);
  const data = await res.json();
  const course = data.results;

  return (
    <main>
      <Providers>
        <ContextProvider>{children}</ContextProvider>
      </Providers>
    </main>
  );
}
