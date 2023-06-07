import Authentication from './Authentication';
import Container from './Container';
import Logo from './Logo';
import Navigation from './Navigation';

export default function Navbar() {
  return (
    <header className="bg-white">
      <Container>
        <Logo />
        <Navigation />
        <Authentication />
      </Container>
    </header>
  );
}
