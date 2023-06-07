import { ShoppingBagIcon, TagIcon } from '@heroicons/react/20/solid';
import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  ArrowPathIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline'; // replace with your actual icon package

export const products = [
  {
    name: 'Cursos en Línea',
    description:
      'Descubre nuestros cursos interactivos y a tu ritmo para aprender programacion desde cero.',
    href: '/courses',
    icon: AcademicCapIcon,
  },
  // {
  //   name: 'Academias',
  //   description:
  //     'Únete a nuestras academias de programación intensivas y acelera tu aprendizaje de Python con la ayuda de expertos.',
  //   href: '/academies',
  //   icon: CursorArrowRaysIcon,
  // },
  // {
  //   name: 'Entrenamiento',
  //   description:
  //     'Potencia tus habilidades con nuestro entrenamiento personalizado de Python. Nos adaptamos a tus necesidades y objetivos.',
  //   href: '/training',
  //   icon: FingerPrintIcon,
  // },
  // {
  //   name: 'Consultorías',
  //   description:
  //     'Obtén asesoramiento de expertos para tus proyectos de Python. Te ayudamos a optimizar y mejorar tu código.',
  //   href: '/consulting',
  //   icon: SquaresPlusIcon,
  // },
  // {
  //   name: 'Desarrollo',
  //   description:
  //     'Ofrecemos servicios de desarrollo de software con Python. Creamos soluciones a medida para tu negocio.',
  //   href: '/development',
  //   icon: ArrowPathIcon,
  // },
];

export const callsToAction = [
  { name: 'Tienda en Linea', href: '/store', icon: ShoppingBagIcon },
  { name: 'Precios', href: '/contact', icon: TagIcon },
];

export const company = [
  { name: 'Nosotros', href: '/about' },
  { name: 'Contacto', href: '/contact' },
  // { name: 'Carreras', href: '/careers' },
  { name: 'Soporte', href: '/support' },
];

export const community = [
  { name: 'Discord', href: 'https://discord.gg/BcxQwhXjZh' },
  { name: 'Blog', href: '/blog' },
  { name: 'Videos', href: '/videos' },
  { name: 'Recursos', href: '/resources' },
];
