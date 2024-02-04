import Statusbar from '@/components/Statusbar';
import Navbar from '@/components/Navbar';

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-3">
      <Statusbar />
      <Navbar />
    </div>
  );
}
