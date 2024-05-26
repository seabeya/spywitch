import { useState } from 'react';

import Label from '@/components/shared/Label';
import InputBox from '@/components/InputBox';
import ControlBtn from '@/components/ControlBtn';
import InputError from '@/components/InputError';

import { useItemsStore, useSpyStore, useStatusStore } from '@/store';
import { isEmpty } from '@/lib/utils';
import Spy from '@/lib/Spy';
import Chat2Db from '@/lib/Chat2Db';

export default function ModeEvents() {
  const Channels = useItemsStore((state) => state.channels);

  const getChannels = (items: string[]) => {
    useItemsStore.setState({ channels: items });
  };

  //
  const [isError, setIsError] = useState({
    channels: false,
  });

  if (Channels.length !== 0 && isError.channels) {
    isError.channels = false;
  }

  //
  const Status = useStatusStore((state) => state.status);
  const isDisabled = Status === 'loading';

  //
  const startHandler = async () => {
    // Currently manually defining events:
    useItemsStore.setState({ events: ['sub', 'resub', 'cheer', 'subgift'] });

    const channelsEmpty = isEmpty(Channels);

    if (channelsEmpty) {
      if (isError.channels !== channelsEmpty) {
        setIsError({
          channels: channelsEmpty,
        });
      }

      return;
    }

    const spy = new Spy('Events');
    try {
      useStatusStore.setState({ status: 'loading' });

      await spy.init(Channels);

      const handle = new Chat2Db(spy.idb);
      spy.tmiClient.on('subscription', handle.onSubscription.bind(handle));
      spy.tmiClient.on('resub', handle.onResub.bind(handle));
      spy.tmiClient.on('cheer', handle.onCheer.bind(handle));
      spy.tmiClient.on('subgift', handle.onSubgift.bind(handle));
      spy.tmiClient.on('submysterygift', handle.onSubmysterygift.bind(handle));

      spy.tmiClient.on('connected', () => {
        console.log('Connected.');
      });

      await spy.start();
    } catch (_) {
      useStatusStore.setState({ status: 'idle' });
      console.log('Something went wrong! Please refresh the page and try again.');
    } finally {
      useSpyStore.setState({ spy: spy });
      useStatusStore.setState({ status: 'running' });
    }
  };

  //
  const stopHandler = async () => {
    useStatusStore.setState({ status: 'loading' });

    const Spy = useSpyStore.getState().spy;
    try {
      await Spy.stop();
    } catch (_) {
      console.log(
        'Something went wrong while gracefully stopping the application! Please refresh the page to force stop.',
      );
    } finally {
      useSpyStore.setState({ spy: {} as Spy });
      useStatusStore.setState({ status: 'idle' });
    }
  };

  return (
    <>
      <Label htmlFor="events" title="Events" desc="the events you are going to track">
        <p className="rounded bg-neutral-400 p-2 *:font-medium *:underline">
          Currently available events: <span>Sub</span>, <span>Resub</span>, <span>Cheer</span>, <span>Subgift</span>.
        </p>
      </Label>
      <Label htmlFor="channels" title="Channels" desc="the channels where you want to track the events">
        <InputBox
          id="channels"
          placeholder="Enter channel names."
          status={Status}
          items={Channels}
          getItems={getChannels}
        />
        {isError.channels && <InputError message="Please enter at least one channel." />}
      </Label>
      <div className="mt-2 flex justify-end xl:mt-4">
        {Status === 'idle' ? (
          <ControlBtn variant="start" isDisabled={isDisabled} onClick={startHandler} />
        ) : (
          <ControlBtn variant="stop" isDisabled={isDisabled} onClick={stopHandler} />
        )}
      </div>
    </>
  );
}
