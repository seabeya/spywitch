import IconSpyWitch from '@/components/shared/icons/IconSpyWitch';

export default function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 pb-5">
      <IconSpyWitch className="h-32 w-32 -rotate-12 animate-pulse grayscale xl:h-44 xl:w-44" />
      <p className="max-w-xs text-center text-sm font-medium text-gray-400 xl:max-w-md xl:text-base">{children}</p>
    </div>
  );
}
