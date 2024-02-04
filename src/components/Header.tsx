import Container from '@/components/wrappers/Container';

import Logo from '@/components/parts/Logo';
import GithubBtn from '@/components/parts/GithubBtn';

export function Header() {
  return (
    <header className="sticky top-0 border-b border-c_border1 bg-c_header">
      <Container>
        <div className="flex items-center justify-between">
          <Logo />
          <GithubBtn />
        </div>
      </Container>
    </header>
  );
}
