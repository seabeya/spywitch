import GitHubBtn from '@/components/github-btn';
import Logo from '@/components/logo';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="h-14 border-b border-c-line bg-c-fg">
        <div className="container mx-auto flex h-full items-center justify-between gap-s-gap px-s-gap">
          <Logo />
          <GitHubBtn />
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
