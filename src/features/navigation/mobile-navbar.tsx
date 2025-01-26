'use client';

import Button from '@/components/blocks/button';
import IconLogs from '@/components/icons/logs';
import IconLogsFill from '@/components/icons/logs-fill';
import IconSpy from '@/components/icons/spy';
import IconSpyFill from '@/components/icons/spy-fill';
import { SYS_PAGE_GROUPS } from '@/system/pages';
import { usePathname } from 'next/navigation';

type NavItems = (typeof SYS_PAGE_GROUPS.navbar)[number]['name'];

const pageIcons: Record<NavItems, Record<'default' | 'active', React.ReactNode>> = {
  spy: {
    default: <IconSpy className="size-5 shrink-0" />,
    active: <IconSpyFill className="size-5 shrink-0" />,
  },
  logs: {
    default: <IconLogs className="size-5 shrink-0" />,
    active: <IconLogsFill className="size-5 shrink-0" />,
  },
};

function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 grid h-s-nav-height w-full auto-cols-fr grid-flow-col border-t border-c-line bg-c-fg/75 backdrop-blur-sm lg:hidden">
      {SYS_PAGE_GROUPS.navbar.map((page, i) => {
        return (
          <Button.Link key={i} href={page.path} variant={'ghost'} className="flex-col rounded-none">
            {pathname === page.path ? pageIcons[page.name].active : pageIcons[page.name].default}
            <span>{page.label}</span>
          </Button.Link>
        );
      })}
    </nav>
  );
}

export default MobileNavbar;
