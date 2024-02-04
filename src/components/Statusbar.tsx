function Info({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-max flex-1 flex-row-reverse items-center justify-end gap-1 px-2 pb-2 pt-2 sm:flex-col sm:items-stretch sm:justify-stretch sm:gap-0 sm:px-4 sm:pt-0">
      <span className="text-sm font-medium text-gray-300 xl:text-base">{value}</span>
      <span className="text-xs text-gray-400 xl:text-sm">{label}</span>
    </div>
  );
}

export default function Statusbar() {
  return (
    <div className="overflow-hidden rounded-xl border border-c_border1 bg-c_main">
      <div className="border-c_border2 sm:pt-3 lg:border-b lg:bg-c_body xl:pt-5">
        <div className="flex divide-x divide-c_border1 lg:divide-c_border2">
          <Info value="0" label="Users" />
          <Info value="0" label="Channels" />
          <Info value="00:00" label="Up Time" />
        </div>
      </div>
      <div className="hidden py-4 text-center text-sm text-gray-300 lg:block xl:py-8 xl:text-base">Not Activated</div>
    </div>
  );
}
