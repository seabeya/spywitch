import Statusbar from '@/components/general/Statusbar';
import AuthorInfo from '@/components/general/AuthorInfo';

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-3">
      <Statusbar />
      <div>Sidebar</div>
      <AuthorInfo />
    </div>
  );
}
