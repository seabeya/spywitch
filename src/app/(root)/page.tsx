import PageArea from '@/components/layout/page-area';
import Section from '@/components/layout/section';
import Modes from '@/features/spy/modes';

export default function Page() {
  return (
    <PageArea>
      <Section title="Modes">
        <Modes />
      </Section>
      <Section title="Section 2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum molestias nulla quaerat voluptas eum nisi ad
        animi recusandae nesciunt pariatur placeat cum, harum sed voluptates consectetur, suscipit, qui culpa molestiae!
      </Section>
    </PageArea>
  );
}
