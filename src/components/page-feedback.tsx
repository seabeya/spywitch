import IconSpyWitch from './icons/spywitch';

function PageFeedback({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-s-gap py-s-gap text-center text-sm text-c-secondary-text/75">
      <IconSpyWitch className="size-20 shrink-0 grayscale" />
      {children}
    </div>
  );
}

export default PageFeedback;
