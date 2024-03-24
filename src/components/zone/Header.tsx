import Container from '@/components/layout/Container';

import HeaderBtn from '@/components/HeaderBtn';

export default function Header() {
  return (
    <header className="z-20 border-b border-c_border1 bg-c_header sm:sticky sm:top-0">
      <Container>
        <div className="flex items-center justify-between">
          <HeaderBtn.Logo />
          <HeaderBtn.GitHub />
        </div>
      </Container>
    </header>
  );
}
