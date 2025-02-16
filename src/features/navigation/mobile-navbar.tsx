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
            className={cn('flex-col rounded-none border-t border-transparent', {
              'border-c-secondary-text text-c-primary-text': currentPath === path,
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
