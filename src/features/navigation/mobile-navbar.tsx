'use client';

import Button from '@/components/blocks/button';
import { cn } from '@/lib/utils';
import { SYS_PAGE_GROUPS } from '@/system/pages';
import { usePathname } from 'next/navigation';

function MobileNavbar() {
  const currentPath = usePathname();

  return (
    <nav className="fixed bottom-0 grid h-s-nav-height w-full auto-cols-fr grid-flow-col gap-s-gap border-t border-c-line bg-c-fg/75 backdrop-blur-sm lg:hidden">
      {SYS_PAGE_GROUPS.navbar.map(({ label, path, icon: Icon }, i) => {
        return (
          <Button.Link
            key={i}
            href={path}
            variant={'ghost'}
            className={cn('flex-col overflow-hidden rounded-none', {
              'border-c-secondary-text text-c-primary-text shadow-[0_-1px_0_0_#d4d4d4]': currentPath === path,
            })}
          >
            <Icon className="size-5 shrink-0" />
            <span>{label}</span>
          </Button.Link>
        );
      })}
    </nav>
  );
}

export default MobileNavbar;
