import Statusbar from '@/components/Statusbar';
import Navbar from '@/components/Navbar';

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-3">
      <Statusbar />
      <Navbar />
      <p className="-mt-1 hidden text-center text-xs text-gray-500 lg:block" suppressHydrationWarning={true}>
        {`© ${new Date().getFullYear()} Sha'an Aliyev / `}
        <a href="https://www.seabeya.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
          seabeya.com
        </a>
      </p>
    </div>
  );
}
