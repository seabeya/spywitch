import NavBtn from '@/components/NavBtn';

export default function Navbar() {
  return (
    <nav className="hidden rounded-outher border border-brdr bg-neutral-950 p-3 lg:flex lg:flex-col lg:gap-3">
      <NavBtn href="/" label="Spy" />
      <NavBtn href="/logs" label="Logs" />
      <NavBtn href="/about" label="About" />
    </nav>
  );
}
