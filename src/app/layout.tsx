import '@/styles/globals.css';
import '@/styles/CustomVideo.css';

import { Nunito } from 'next/font/google';
import Providers from '@/components/Providers';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'SoloPython - Academia de Programación Python',
  description:
    'Cursos interactivos y de alta calidad para aprender Python. Únete a nuestra academia y transforma tu carrera en programación, sin importar tu nivel de experiencia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
