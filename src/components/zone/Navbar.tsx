'use client';

import IconHome from '@/components/shared/icons/IconHome';
import IconSpy from '@/components/shared/icons/IconSpy';
import IconLogs from '@/components/shared/icons/IconLogs';

import NavBtn from '@/components/NavBtn';

const icons = {
  home: <IconHome className="h-5 w-5" />,
  spy: <IconSpy className="h-5 w-5" />,
  logs: <IconLogs className="h-5 w-5" />,
};

export default function Navbar() {
  return (
    <>
      {/* Side Navbar */}
      <nav className="hidden flex-col gap-3 rounded-xl border border-c_border1 bg-c_main p-3 lg:flex">
        <NavBtn href="/" label="Home" />
        <NavBtn href="/spy" label="Spy" />
        <NavBtn href="/logs" label="Logs" />
      </nav>
      {/* Fixed (bottom) Navbar */}
      <nav className="fixed bottom-0 left-0 w-full lg:hidden">
        <div className="sm:container sm:px-5">
          <div className="grid auto-cols-fr grid-flow-col grid-rows-1 border-t border-c_border1 bg-c_header px-3 sm:rounded-t-xl sm:border-l sm:border-r">
            <NavBtn.Fixed href="/" label="Home" icon={icons.home} />
            <NavBtn.Fixed href="/spy" label="Spy" icon={icons.spy} />
            <NavBtn.Fixed href="/logs" label="Logs" icon={icons.logs} />
          </div>
        </div>
      </nav>
    </>
  );
}
