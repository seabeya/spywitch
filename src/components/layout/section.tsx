interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold capitalize text-c-secondary-text">{title}</span>
      <div className="border-t border-c-line py-s-gap">{children}</div>
    </div>
  );
}

export default Section;
