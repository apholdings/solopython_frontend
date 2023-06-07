import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export const metadata = {
  title: 'Prices - ',
  description:
    'Cursos interactivos y de alta calidad para aprender Python. Únete a nuestra academia y transforma tu carrera en programación, sin importar tu nivel de experiencia.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
