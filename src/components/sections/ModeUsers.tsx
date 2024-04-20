import { useState } from 'react';

import Label from '@/components/shared/Label';
import InputBox from '@/components/InputBox';
import ControlBtn from '@/components/ControlBtn';
import InputError from '@/components/InputError';

import { useItemsStore, useStatusStore } from '@/store';
import { isEmpty } from '@/lib/utils';

export default function ModeUsers() {
  const Users = useItemsStore((state) => state.items1);
  const Channels = useItemsStore((state) => state.items2);

  const getUsers = (items: string[]) => {
    useItemsStore.setState({ items1: items });
  };

  const getChannels = (items: string[]) => {
    useItemsStore.setState({ items2: items });
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

    if (isError.users !== usersEmpty || isError.channels !== channelsEmpty) {
      setIsError({
        users: usersEmpty,
        channels: channelsEmpty,
      });
    }

    if (usersEmpty || channelsEmpty) {
      return;
    }
  };

  //
  const stopHandler = () => {};

  return (
    <>
      <Label htmlFor="users" title="Users" desc="the users you are going to track">
        <InputBox
          id="users"
          placeholder="Enter user names separated with spaces."
          status={Status}
          items={Users}
          getItems={getUsers}
        />
        {isError.users && <InputError message="Please enter at least one user." />}
      </Label>
      <Label htmlFor="channels" title="Channels" desc="the channels where you want to track the users">
        <InputBox
          id="channels"
          placeholder="Enter channel names separated with spaces."
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
