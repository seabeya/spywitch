function PageArea({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-9 p-s-gap">{children}</div>;
}

export default PageArea;
