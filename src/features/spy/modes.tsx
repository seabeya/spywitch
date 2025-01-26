'use client';

import Button from '@/components/blocks/button';
import { cn } from '@/lib/utils';
import { MODES } from '@/system/spy';
import { useState } from 'react';

type ModeName = (typeof MODES)[number]['name'];

function Modes() {
  const [currentMode, setCurrentMode] = useState<ModeName>('users');

  const handleModeChange = (mode: ModeName) => {
    setCurrentMode(mode);
  };

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-s-gap *:whitespace-normal sm:grid-cols-2">
      {MODES.map((mode, i) => {
        return (
          <Button
            key={i}
            variant={'secondary'}
            border={'mid'}
            className={cn('flex-col items-start justify-start gap-1 p-s-gap', {
              'border-c-line-high bg-c-secondary-fg': currentMode === mode.name,
            })}
            onClick={() => handleModeChange(mode.name)}
          >
            <span className="capitalize">{mode.name}</span>
            <p className="text-start text-c-secondary-text/75">{mode.description}</p>
          </Button>
        );
      })}
    </div>
  );
}

export default Modes;
