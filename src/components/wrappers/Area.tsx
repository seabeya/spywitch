import Container from '@/components/wrappers/Container';

export default function Area({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <main className="flex flex-wrap items-start gap-5 py-5">{children}</main>
    </Container>
  );
}

function Side({ children }: { children: React.ReactNode }) {
  return <div className="w-full lg:flex-[2]">{children}</div>;
}

Area.Side = Side;

function Page({ children }: { children: React.ReactNode }) {
  return <div className="w-full rounded-xl border border-c_border1 bg-c_main p-5 lg:flex-[5]">{children}</div>;
}

Area.Page = Page;
