import AuthorInfo from '@/components/author-info';
import GitHubBtn from '@/components/github-btn';
import Logo from '@/components/logo';
import Navbar from '@/features/navigation/navbar';
import Statusbar from '@/features/status/statusbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="h-14 border-b border-c-line bg-c-fg">
        <div className="container mx-auto flex h-full items-center justify-between gap-s-gap px-s-gap">
          <Logo />
          <GitHubBtn />
        </div>
      </header>
      <div className="container mx-auto flex gap-s-gap p-s-gap">
        <div className="flex w-full max-w-80 flex-col gap-s-gap">
          <Statusbar />
          <Navbar />
          <AuthorInfo />
        </div>
        <main className="flex-1 rounded-lg border border-c-line bg-c-fg p-s-gap">{children}</main>
      </div>
    </>
  );
}
