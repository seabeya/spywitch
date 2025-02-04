import AuthorInfo from '@/components/author-info';
import GitHubBtn from '@/components/github-btn';
import Logo from '@/components/logo';
import MobileNavbar from '@/features/navigation/mobile-navbar';
import Navbar from '@/features/navigation/navbar';
import Statusbar from '@/features/status/components/statusbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="h-14 border-b border-c-line bg-c-fg">
        <div className="container mx-auto flex h-full items-center justify-between gap-s-gap px-s-gap">
          <Logo />
          <GitHubBtn />
        </div>
      </header>
      <div className="container mx-auto mb-s-nav-height flex flex-col items-start gap-s-gap p-s-gap lg:flex-row">
        <div className="sticky top-1 flex w-full flex-col gap-s-gap sm:static lg:max-w-72 xl:max-w-80">
          <Statusbar />
          <Navbar />
          <AuthorInfo />
        </div>
        <main className="w-full flex-1 rounded-lg border border-c-line bg-c-fg">{children}</main>
      </div>
      <MobileNavbar />
    </>
  );
}
