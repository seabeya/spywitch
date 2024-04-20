import Statusbar from '@/components/general/Statusbar';
import Navbar from '@/components/general/Navbar';
import AuthorInfo from '@/components/general/AuthorInfo';

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-3">
      <Statusbar />
      <Navbar />
      <AuthorInfo />
    </div>
  );
}
