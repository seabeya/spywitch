type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
  title: string;
  desc?: string;
};

export default function Label({ children, htmlFor, title, desc }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-sm text-txt-low xl:text-base">
        {title}
        {!!desc && <i className="text-txt-lower ml-1 text-xs xl:text-sm">({desc})</i>}
      </span>
      {children}
    </label>
  );
}
