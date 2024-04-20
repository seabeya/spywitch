import Statusbar from '@/components/general/Statusbar';

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-3">
      <Statusbar />
      <div>Sidebar</div>
      <div>(c)</div>
    </div>
  );
}
