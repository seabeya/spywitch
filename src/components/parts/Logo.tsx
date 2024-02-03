import IconSpyWitch from '@/components/icons/IconSpyWitch';

export default function Logo() {
  return (
    <div className="flex max-w-fit p-1">
      <IconSpyWitch className="h-10 w-10 shrink-0 -rotate-12 sm:h-12 sm:w-12" />
      <span className="-ml-2 text-sm text-white sm:text-base">
        Spy<b className="text-purple-500">Witch</b>
      </span>
    </div>
  );
}
