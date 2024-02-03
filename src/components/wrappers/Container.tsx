export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="container px-2 sm:px-5">{children}</div>;
}
