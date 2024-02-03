import Container from '@/components/wrappers/Container';
import Logo from '@/components/parts/Logo';

export function Header() {
  return (
    <header className="sticky top-0 border-b border-gray-800 bg-c3">
      <Container>
        <div>
          <Logo />
        </div>
      </Container>
    </header>
  );
}
