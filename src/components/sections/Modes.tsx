import { modeDescriptions, modeOptions } from '@/consts';

import SectionArea from '@/components/shared/SectionArea';
import ModeBtn from '@/components/ModeBtn';

export default function Modes() {
  return (
    <SectionArea title="Modes">
      <div className="grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1">
        {modeOptions.map((mode) => (
          <ModeBtn key={mode} label={mode} desc={modeDescriptions[mode]} />
        ))}
      </div>
    </SectionArea>
  );
}
