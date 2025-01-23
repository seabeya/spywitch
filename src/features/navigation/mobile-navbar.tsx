'use client';

import Button from '@/components/blocks/button';
import IconLogs from '@/components/icons/logs';
import IconSpy from '@/components/icons/spy';
import { cn } from '@/lib/utils';
import { SYS_PAGE_GROUPS } from '@/system/pages';
import { usePathname } from 'next/navigation';

type NavItems = (typeof SYS_PAGE_GROUPS.navbar)[number]['name'];

const pageIcons: Record<NavItems, React.ReactNode> = {
  spy: <IconSpy className="size-5 shrink-0" />,
  logs: <IconLogs className="size-5 shrink-0" />,
};

function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 grid h-s-nav-height w-full auto-cols-fr grid-flow-col border-t border-c-line bg-c-fg lg:hidden">
      {SYS_PAGE_GROUPS.navbar.map((page) => {
        return (
          <Button.Link
            key={page.name}
            href={page.path}
            variant={'ghost'}
            className={cn('flex-col rounded-none', { 'bg-c-secondary-fg': pathname === page.path })}
          >
            {pageIcons[page.name]}
            <span>{page.label}</span>
          </Button.Link>
        );
      })}
    </nav>
  );
}

export default MobileNavbar;
