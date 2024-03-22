export default function SectionArea({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section>
      <h2 className="border-b border-c_border2 pb-2 text-sm font-medium text-gray-300 lg:text-base">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  );
}
