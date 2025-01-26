'use client';

import Button from '@/components/blocks/button';
import IconRight from '@/components/icons/right';
import { cn } from '@/lib/utils';
import { SYS_PAGE_GROUPS } from '@/system/pages';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-col gap-s-gap rounded-lg border border-c-line bg-c-fg p-s-gap lg:flex">
      {SYS_PAGE_GROUPS.navbar.map((page, i) => {
        return (
          <Button.Link
            key={i}
            href={page.path}
            variant={'secondary'}
            size={'side'}
            border={'mid'}
            className={cn('justify-between', { 'border-c-line-high bg-c-secondary-fg': pathname === page.path })}
          >
            <span>{page.label}</span>
            <IconRight className="size-5 shrink-0 text-c-secondary-text/75" />
          </Button.Link>
        );
      })}
    </nav>
  );
}

export default Navbar;
