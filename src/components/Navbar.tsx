import Link from 'next/link';

import IconChevron from '@/components/icons/IconChevron';

function NavBtn({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="group flex items-center justify-between overflow-hidden rounded-lg border border-c_border1 bg-c_body px-4 py-2 text-gray-400 hover:border-sky-900 hover:bg-c_active hover:text-gray-200"
      href={href}
    >
      {label}
      <IconChevron className="h-6 w-6 shrink-0 fill-gray-500 group-hover:fill-sky-600" />
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="flex flex-col gap-3 rounded-xl border border-c_border1 bg-c_main p-3">
      <NavBtn href="/" label="Home" />
      <NavBtn href="/spy" label="Spy" />
      <NavBtn href="/logs" label="Logs" />
      <NavBtn href="/lists" label="Lists" />
    </nav>
  );
}
