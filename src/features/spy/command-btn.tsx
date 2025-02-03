import Button from '@/components/blocks/button';
import IconStart from '@/components/icons/start';
import IconStop from '@/components/icons/stop';
import { cn, isAnyEmptyField } from '@/lib/utils';
import { useModeStore, useStatusStore } from '@/system/store';
import { useState } from 'react';

function CommandBtn() {
  const [error, setError] = useState('');

  const currentStatus = useStatusStore();

  const handleClick = () => {
    if (isAnyEmptyField(useModeStore.getState())) {
      setError('Some fields are missing. Please fill them in and try again');
      return;
    }

    setError('');

    if (currentStatus === 'idle') {
      useStatusStore.setState('loading');
      setTimeout(() => {
        useStatusStore.setState('running');
      }, 1000);
    } else {
      useStatusStore.setState('loading');
      setTimeout(() => {
        useStatusStore.setState('idle');
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-end gap-s-gap">
      <Button
        size={'regular'}
        className={cn(
          'rounded-sm text-c-primary-text disabled:cursor-wait disabled:bg-c-secondary-fg disabled:text-c-secondary-text',
          {
            'bg-c-primary hover:bg-c-primary/90': currentStatus === 'idle',
            'bg-red-700 hover:bg-red-700/90': currentStatus === 'running',
          },
        )}
        disabled={currentStatus === 'loading'}
        onClick={handleClick}
      >
        {currentStatus === 'idle' ? (
          <>
            <span>Start</span>
            <IconStart className="size-5 shrink-0" />
          </>
        ) : (
          <>
            <span>Stop</span>
            <IconStop className="size-5 shrink-0" />
          </>
        )}
      </Button>
      {error.length > 0 && <div className="pl-1 text-xs text-red-500">{error}.</div>}
    </div>
  );
}

export default CommandBtn;
