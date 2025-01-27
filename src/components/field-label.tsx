interface FieldLabelProps {
  title: string;
  hint?: string;
  children: React.ReactNode;
}

function FieldLabel({ title, hint, children }: FieldLabelProps) {
  return (
    <label className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-1">
        <span className="text-sm capitalize text-c-secondary-text">{title}</span>
        <span className="text-xs text-c-secondary-text/75">({hint})</span>
      </div>
      {children}
    </label>
  );
}

export default FieldLabel;
