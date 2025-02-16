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

      const spy = new Spy(currentMode);
      await spy.connect(channels);

      const handlers = new ToSave(spy.idb, currentMode, users);
      spy.setListeners(handlers, events);

      useSpyStore.setState(spy, true);
      useStatusStore.setState('running');
    } catch (_) {
      setError('Something went wrong. Please refresh the page and try again.');
      useStatusStore.setState('idle');
    }
  };

  const handleStop = async () => {
    useStatusStore.setState('loading');

    try {
      const spy = useSpyStore.getState();
      await spy?.disconnect();
      useStatusStore.setState('idle');
    } catch (error) {
      setError('Something went wrong. Please refresh the page.');
      useStatusStore.setState('running');
    }
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
