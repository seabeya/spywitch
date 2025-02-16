'use client';

import Button from '@/components/blocks/button';
import { cn } from '@/lib/utils';
import { MODES } from '@/system/consts';
import { useIsActiveStore, useModeStore } from '@/system/store';
import { ModeName } from '@/system/types';

function Modes() {
  const isActive = useIsActiveStore();

  const currentMode = useModeStore();

  const handleModeChange = (mode: ModeName) => {
    if (isActive) return;

    useModeStore.setState(mode);
  };

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-s-gap *:whitespace-normal sm:grid-cols-2">
      {Object.values(MODES).map((mode, i) => {
        return (
          <Button
            key={i}
            variant={'secondary'}
            border={'mid'}
            className={cn('flex-col items-start justify-start gap-1 p-s-gap', {
              'border-c-line-high bg-c-secondary-fg': currentMode === mode.name,
              'pointer-events-none': isActive,
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
