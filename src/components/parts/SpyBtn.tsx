import IconStart from '@/components/icons/IconStart';

export default function SpyBtn({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-sm bg-purple-700 px-6 pb-[6px] pt-1 text-sm font-medium text-gray-200 duration-75 hover:bg-purple-600 xl:px-8 xl:pb-[5px] xl:text-base">
      {label}
      <IconStart className="-mb-[1px] h-3 w-3 xl:mb-0" />
    </button>
  );
}
