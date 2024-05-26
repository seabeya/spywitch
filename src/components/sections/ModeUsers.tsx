import { useState } from 'react';

import Label from '@/components/shared/Label';
import InputBox from '@/components/InputBox';
import ControlBtn from '@/components/ControlBtn';
import InputError from '@/components/InputError';

import { useItemsStore, useSpyStore, useStatusStore } from '@/store';
import { isEmpty } from '@/lib/utils';
import Spy from '@/lib/Spy';
import Chat2Db from '@/lib/Chat2Db';

export default function ModeUsers() {
  const Users = useItemsStore((state) => state.users);
  const Channels = useItemsStore((state) => state.channels);

  const getUsers = (items: string[]) => {
    useItemsStore.setState({ users: items });
  };

  const getChannels = (items: string[]) => {
    useItemsStore.setState({ channels: items });
  };

  //
  const [isError, setIsError] = useState({
    users: false,
    channels: false,
  });

  if (Users.length !== 0 && isError.users) {
    isError.users = false;
  }

  if (Channels.length !== 0 && isError.channels) {
    isError.channels = false;
  }

  //
  const Status = useStatusStore((state) => state.status);
  const isDisabled = Status === 'loading';

  //
  const startHandler = async () => {
    const usersEmpty = isEmpty(Users);
    const channelsEmpty = isEmpty(Channels);

    if (usersEmpty || channelsEmpty) {
      if (isError.users !== usersEmpty || isError.channels !== channelsEmpty) {
        setIsError({
          users: usersEmpty,
          channels: channelsEmpty,
        });
      }

      return;
    }

    const spy = new Spy('Users');
    try {
      useStatusStore.setState({ status: 'loading' });

      await spy.init(Channels);

      const handle = new Chat2Db(spy.idb, Users);
      spy.tmiClient.on('message', handle.onMessage.bind(handle));
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
      <Label htmlFor="users" title="Users" desc="the users you are going to track">
        <InputBox id="users" placeholder="Enter usernames." status={Status} items={Users} getItems={getUsers} />
        {isError.users && <InputError message="Please enter at least one user." />}
      </Label>
      <Label htmlFor="channels" title="Channels" desc="the channels where you want to track the users">
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
