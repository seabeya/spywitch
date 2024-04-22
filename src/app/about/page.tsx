import IconSpyWitch from '@/components/shared/Icons/IconSpyWitch';

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-2 *:text-center">
      <IconSpyWitch className="h-24 w-24 shrink-0" />
      <h1 className="text-2xl text-txt-light xl:text-3xl">SpyWitch</h1>
      <p className="text-sm text-txt-low xl:text-base">An open-source live data tracker for Twitch.tv</p>
      <p className="text-sm text-txt-last xl:text-base">SpyWitch was made for channel moderation purposes only</p>
    </div>
  );
}
