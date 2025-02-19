import Button from '@/components/blocks/button';
import IconStart from '@/components/icons/start';
import IconStop from '@/components/icons/stop';
import { useItemsStore, useModeStore, useSpyStore, useStatusStore } from '@/system/store';
import { useState } from 'react';
import { hasAnyEmptyField } from '../utils';
import Spy from '@/lib/action/spy';
import ToSave from '@/lib/action/to-save';
import { EVENTS } from '@/system/consts';

function CommandBtn() {
  const [error, setError] = useState('');

  const currentStatus = useStatusStore();

  const handleStart = async () => {
    const currentMode = useModeStore.getState();

    if (hasAnyEmptyField(currentMode)) {
      setError('Some fields are missing. Please fill them in and try again');
      return;
    }

    setError('');
    useStatusStore.setState('loading');

    try {
      const users = useItemsStore.getState().users;
      const channels = useItemsStore.getState().channels;
      const events = currentMode === 'users' ? [...EVENTS] : useItemsStore.getState().events;

      const spy = new Spy(currentMode, events);
      await spy.connect(channels);

      const handlers = new ToSave(spy.idb, currentMode, users);
      spy.setListeners(handlers);

      useSpyStore.setState(spy, true);
      useStatusStore.setState('running');
    } catch {
      setError('Something went wrong. Please refresh the page and try again');
      useStatusStore.setState('idle');
    }
  };

  const handleStop = async () => {
    useStatusStore.setState('loading');

    try {
      const spy = useSpyStore.getState();
      await spy?.disconnect();
      useStatusStore.setState('idle');
    } catch {
      setError('Something went wrong. Please refresh the page');
      useStatusStore.setState('running');
    }
  };

  return (
    <div className="flex flex-col items-end gap-s-gap">
      <div className="w-24">
        {currentStatus === 'idle' ? (
          <Button variant={'primary'} size={'regular'} className="w-full rounded-sm" onClick={handleStart}>
            <span>Start</span>
            <IconStart className="size-5 shrink-0" />
          </Button>
        ) : (
          <Button
            size={'regular'}
            className="w-full rounded-sm bg-red-700 text-c-primary-text hover:bg-red-700/90 disabled:cursor-wait disabled:bg-c-secondary-fg disabled:text-c-secondary-text"
            disabled={currentStatus === 'loading'}
            onClick={handleStop}
          >
            <span>Stop</span>
            <IconStop className="size-5 shrink-0" />
          </Button>
        )}
      </div>
      {error.length > 0 && <div className="text-xs text-red-500">{error}.</div>}
      {currentStatus === 'running' && (
        <div className="text-xs text-green-500 *:inline *:text-xs">Go to the monitor page to view the logs.</div>
      )}
    </div>
  );
}

export default CommandBtn;
