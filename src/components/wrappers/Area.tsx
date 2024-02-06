import Container from '@/components/wrappers/Container';

import SectionTitle from '@/components/parts/SectionTitle';

export default function Area({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <main className="flex flex-wrap items-start gap-3 pb-16 pt-3 sm:gap-5 sm:pt-5 lg:pb-5">{children}</main>
    </Container>
  );
}

function Side({ children }: { children: React.ReactNode }) {
  return <div className="sticky top-1 w-full sm:static lg:flex-[2]">{children}</div>;
}

Area.Side = Side;

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-16 rounded-xl border border-c_border1 bg-c_main p-5 lg:flex-[5]">
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
