import IconSpyWitch from '@/components/shared/Icons/IconSpyWitch';

export default function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <IconSpyWitch className="h-24 w-24 shrink-0 grayscale" />
      <p className="max-w-xs text-center text-sm font-medium text-txt-lower xl:max-w-md xl:text-base">{children}</p>
    </div>
  );
}
