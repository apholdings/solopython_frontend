import axios from 'axios';
import Authentication from './Authentication';
import Container from './Container';
import Logo from './Logo';
import Navigation from './Navigation';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { getServerSession } from 'next-auth';

export default function Navbar() {
  // const session = await getServerSession(authOptions);

  return (
    <header className="">
      <Container>
        <Logo />
        <Navigation />
      </Container>
    </header>
  );
}
