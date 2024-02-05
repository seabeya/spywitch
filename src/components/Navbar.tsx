import NavBtn from '@/components/parts/NavBtn';

export default function Navbar() {
  return (
    <nav className="hidden flex-col gap-3 rounded-xl border border-c_border1 bg-c_main p-3 lg:flex">
      <NavBtn href="/" label="Home" />
      <NavBtn href="/spy" label="Spy" />
      <NavBtn href="/logs" label="Logs" />
      <NavBtn href="/lists" label="Lists" />
    </nav>
  );
}
