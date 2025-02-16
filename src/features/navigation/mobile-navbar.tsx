'use client';

import Button from '@/components/blocks/button';
import IconHistory from '@/components/icons/history';
import IconHome from '@/components/icons/home';
import IconMonitor from '@/components/icons/monitor';
import IconSetup from '@/components/icons/setup';
import { cn } from '@/lib/utils';
import { SYS_PAGE_GROUPS } from '@/system/pages';
import { NavItems } from '@/system/types';
import { usePathname } from 'next/navigation';

const pageIcons: Record<NavItems, React.ReactNode> = {
  home: <IconHome className="size-5 shrink-0" />,
  setup: <IconSetup className="size-5 shrink-0" />,
  monitor: <IconMonitor className="size-5 shrink-0" />,
  history: <IconHistory className="size-5 shrink-0" />,
};

function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 grid h-s-nav-height w-full auto-cols-fr grid-flow-col gap-s-gap border-t border-c-line bg-c-fg/75 backdrop-blur-sm lg:hidden">
      {SYS_PAGE_GROUPS.navbar.map((page, i) => {
        return (
          <Button.Link
            key={i}
            href={page.path}
            variant={'ghost'}
            className={cn('flex-col rounded-none border-t border-transparent', {
              'border-c-secondary-text text-c-primary-text': pathname === page.path,
            })}
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
