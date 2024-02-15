import Container from '@/components/wrappers/Container';

import SectionTitle from '@/components/parts/SectionTitle';

export default function Area({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <main className="grid grid-cols-1 items-start gap-3 pb-16 pt-3 sm:gap-5 sm:pt-5 lg:grid-cols-7 lg:pb-5">
        {children}
      </main>
    </Container>
  );
}

function Side({ children }: { children: React.ReactNode }) {
  return <div className="sticky top-1 z-10 sm:static lg:col-start-1 lg:col-end-3">{children}</div>;
}

Area.Side = Side;

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-16 rounded-xl border border-c_border1 bg-c_main p-5 lg:col-start-3 lg:col-end-8">
      {children}
    </div>
  );
}

Area.Page = Page;

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  );
}

Area.Section = Section;
