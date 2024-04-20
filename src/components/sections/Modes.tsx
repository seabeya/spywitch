import SectionArea from '@/components/shared/SectionArea';
import ModeBtn from '@/components/ModeBtn';

import { Mode } from '@/types';

type Modes = {
  name: Mode;
  desc: string;
}[];

export const modes: Modes = [
  {
    name: 'Users',
    desc: "Track users' chat messages and related events in specific Twitch channels.",
  },
  {
    name: 'Events',
    desc: 'Track events such as sub, resub, bit donations, etc., in specific Twitch channels.',
  },
];

export default function Modes() {
  return (
    <SectionArea label="Modes">
      <div className="grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1">
        {modes.map(({ name, desc }) => (
          <ModeBtn key={name} label={name} desc={desc} />
        ))}
      </div>
    </SectionArea>
  );
}
