'use client';

import NavBtn from '@/components/NavBtn';

import IconSpy from '@/components/shared/Icons/IconSpy';
import IconLogs from '@/components/shared/Icons/IconLogs';
import IconAbout from '@/components/shared/Icons/IconAbout';

const navButtons = [
  {
    href: '/',
    label: 'Spy',
    icon: <IconSpy className="h-5 w-5" />,
  },
  {
    href: '/logs',
    label: 'Logs',
    icon: <IconLogs className="h-5 w-5" />,
  },
  {
    href: '/about',
    label: 'About',
    icon: <IconAbout className="h-5 w-5" />,
  },
];

export default function Navbar() {
  return (
    <>
      {/* Side: */}
      <nav className="hidden rounded-outher border border-brdr bg-neutral-950 p-3 lg:flex lg:flex-col lg:gap-3">
        {navButtons.map(({ href, label }) => (
          <NavBtn key={href} href={href} label={label} />
        ))}
      </nav>
      {/* Bottom (fixed): */}
      <nav className="fixed bottom-0 left-0 w-full lg:hidden">
        <div className="sm:container">
          <div className="grid auto-cols-fr grid-flow-col grid-rows-1 border-t border-brdr bg-neutral-950 px-3 sm:rounded-t-outher sm:border-x">
            {navButtons.map(({ href, label, icon }) => (
              <NavBtn.Bottom key={href} href={href} label={label} icon={icon} />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
