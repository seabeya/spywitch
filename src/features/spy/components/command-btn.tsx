import Button from '@/components/blocks/button';
import IconStart from '@/components/icons/start';
import IconStop from '@/components/icons/stop';
import { useModeStore, useStatusStore } from '@/system/store';
import { useState } from 'react';
import { hasAnyEmptyField } from '../utils';

function CommandBtn() {
  const [error, setError] = useState('');

  const currentStatus = useStatusStore();

  const handleStart = () => {
    if (hasAnyEmptyField(useModeStore.getState())) {
      setError('Some fields are missing. Please fill them in and try again');
      return;
    }

    setError('');

    useStatusStore.setState('loading');
    setTimeout(() => {
      useStatusStore.setState('running');
    }, 1000);
  };

  const handleStop = () => {
    useStatusStore.setState('loading');
    setTimeout(() => {
      useStatusStore.setState('idle');
    }, 1000);
  };

  return (
    <div className="flex flex-col items-end gap-s-gap">
      {currentStatus === 'idle' ? (
        <Button variant={'primary'} size={'regular'} className="rounded-sm" onClick={handleStart}>
          <span>Start</span>
          <IconStart className="size-5 shrink-0" />
        </Button>
      ) : (
        <Button
          size={'regular'}
          className="rounded-sm bg-red-700 text-c-primary-text hover:bg-red-700/90 disabled:cursor-wait disabled:bg-c-secondary-fg disabled:text-c-secondary-text"
          disabled={currentStatus === 'loading'}
          onClick={handleStop}
        >
          <span>Stop</span>
          <IconStop className="size-5 shrink-0" />
        </Button>
      )}
      {error.length > 0 && <div className="pl-1 text-xs text-red-500">{error}.</div>}
    </div>
  );
}

export default CommandBtn;
