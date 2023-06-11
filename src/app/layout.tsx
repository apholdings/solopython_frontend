import '@/styles/globals.css';
import '@/styles/CustomVideo.css';
import '@/styles/fonts.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import { Nunito } from 'next/font/google';
import localFont from 'next/font/local';

import Providers from '@/components/Providers';

const font = localFont({
  src: [
    {
      path: '../styles/fonts/circular/CircularStd-Book.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../styles/fonts/circular/CircularStd-BookItalic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../styles/fonts/circular/CircularStd-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../styles/fonts/circular/CircularStd-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../styles/fonts/circular/CircularStd-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../styles/fonts/circular/CircularStd-BoldItalic.woff',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../styles/fonts/circular/CircularStd-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../styles/fonts/circular/CircularStd-Light-Italic.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../styles/fonts/circular/CircularStd-Black.woff',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../styles/fonts/circular/CircularStd-BlackItalic.woff',
      weight: '900',
      style: 'italic',
    },
  ],
});

export const metadata = {
  title: 'SoloPython - Academia de Programación Python',
  description:
    'Cursos interactivos y de alta calidad para aprender Python. Únete a nuestra academia y transforma tu carrera en programación, sin importar tu nivel de experiencia.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
