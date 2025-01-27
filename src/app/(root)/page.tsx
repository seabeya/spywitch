import PageArea from '@/components/layout/page-area';
import Section from '@/components/layout/section';
import Command from '@/features/spy/command';
import Modes from '@/features/spy/modes';

export default function Page() {
  return (
    <PageArea>
      <Section title="Action Modes">
        <Modes />
      </Section>
      <Section title="Command">
        <Command />
      </Section>
    </PageArea>
  );
}
