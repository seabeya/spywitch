function Info({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-max flex-1 flex-col px-4 pb-2 first:pl-0 last:pr-0">
      <span className="font-medium text-gray-300">{value}</span>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
}

export default function Statusbar() {
  return (
    <div className="min-w-max overflow-hidden rounded-xl border border-gray-800 bg-c4 text-white">
      <div className="border-b border-gray-700 bg-c5 px-7 pt-6">
        <div className="flex justify-between divide-x divide-gray-700">
          <Info value="0" label="Users" />
          <Info value="0" label="Channels" />
          <Info value="00:00" label="Up Time" />
        </div>
      </div>
      <div className="px-2 py-8 text-center">Not Activated</div>
    </div>
  );
}
