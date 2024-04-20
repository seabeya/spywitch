type SectionAreaProps = {
  children: React.ReactNode;
  label: string;
};

export default function SectionArea({ children, label }: SectionAreaProps) {
  return (
    <section>
      <h2 className="border-b border-brdr-light pb-2 text-sm font-medium text-txt-low lg:text-base">{label}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  );
}
