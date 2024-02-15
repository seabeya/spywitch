import Container from '@/components/wrappers/Container';

import Logo from '@/components/parts/Logo';
import GithubBtn from '@/components/parts/GithubBtn';

export function Header() {
  return (
    <header className="z-20 border-b border-c_border1 bg-c_header sm:sticky sm:top-0">
      <Container>
        <div className="flex items-center justify-between">
          <Logo />
          <GithubBtn />
        </div>
      </Container>
    </header>
  );
}
