'use client';

import { useState } from 'react';

import Area from '@/components/wrappers/Area';
import Label from '@/components/parts/Label';
import Input from '@/components/parts/Input';
import InputError from '@/components/parts/InputError';
import ControlBtn from '@/components/parts/ControlBtn';

import { useAtom, useAtomValue } from 'jotai';
import { atom_users, atom_channels, atom_status, atom_isLoading, atom_idbConn, atom_tmiConn } from '@/atoms';

import tmi from 'tmi.js';
import { deleteDB, openDB } from 'idb';
import Chat2Db from '@/lib/Chat2Db';

export default function Command() {
  const [isError, setIsError] = useState({
    users: false,
    channels: false,
  });

  const userItems = useAtomValue(atom_users);
  const channelItems = useAtomValue(atom_channels);

  if (userItems.length !== 0 && isError.users) {
    isError.users = false;
  }

  if (channelItems.length !== 0 && isError.channels) {
    isError.channels = false;
  }

  // Start handler {
  const [isLoading, setIsLoading] = useAtom(atom_isLoading);

  const [idbConn, setIdbConn] = useAtom(atom_idbConn);
  const [tmiConn, setTmiConn] = useAtom(atom_tmiConn);
  const [status, setStatus] = useAtom(atom_status);

  const handleStart = async () => {
    // return; if inputs are empty
    if (userItems.length === 0 || channelItems.length === 0) {
      setIsError({
        users: userItems.length === 0,
        channels: channelItems.length === 0,
      });
      return;
    }

    // Set global loading state:
    setIsLoading(true);

    // Create a new tmi client:
    const client = new tmi.Client({
      // When we use `channelItems` directly, it modifies and adds '#' at the beginning of the each item. We don't want that.
      channels: [...channelItems],
      logger: {
        info: () => {},
        warn: () => {},
        error: () => {},
      },
    });

    try {
      // Delete db if exists (to delete the old data):
      await deleteDB('spywitch');

      // Create a new db:
      const idb = await openDB('spywitch', 1, {
        upgrade(db) {
          const store = db.createObjectStore('logs', {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('user', 'user');
        },
      });

      // Set the db connection as a global state for later use:
      setIdbConn(idb);

      // Connect to Twitch:
      await client.connect();

      // Set the tmi connection as a global state for later use:
      setTmiConn(client);

      // Listen to messages:
      const handle = new Chat2Db(idb, userItems);
      client.on('message', handle.onMessage.bind(handle));
      client.on('subscription', handle.onSubscription.bind(handle));
      client.on('resub', handle.onResub.bind(handle));
      client.on('cheer', handle.onCheer.bind(handle));

      // Connection info log message:
      client.on('connected', () => {
        console.log('Connected.');
      });
    } catch (_) {
      console.log('Something went wrong while starting the application. Please refresh the page and try again.');
    } finally {
      // Application is ready state:
      setStatus({ active: true, uCount: userItems.length, cCount: channelItems.length });
      setIsLoading(false);
    }
  };
  // }

  // Stop handler {
  const handleStop = async () => {
    setIsLoading(true);

    try {
      await tmiConn.disconnect();

      setStatus({ active: false, uCount: 0, cCount: 0 });

      setTmiConn({} as tmi.Client);

      // Close the db connection and delete it:
      idbConn.close();
      await deleteDB('spywitch');
    } catch (_) {
      console.log('Something went wrong while stopping the application. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };
  // }

  return (
    <Area.Section title="Command">
      <Label title="Users:" htmlFor="users" desc="the users you are going to track">
        <Input id="users" placeholder="Enter usernames separated with spaces." itemsAtom={atom_users} />
        {isError.users && <InputError message="Please enter at least one user." />}
      </Label>
      <Label title="Channels:" htmlFor="channels" desc="the channels where you want to track the users">
        <Input id="channels" placeholder="Enter channel names separated with spaces." itemsAtom={atom_channels} />
        {isError.channels && <InputError message="Please enter at least one channel." />}
      </Label>
      <div className="mt-2 flex justify-end gap-2 xl:mt-4">
        {status.active ? (
          <ControlBtn variant="stop" isDisabled={isLoading} onClick={handleStop} />
        ) : (
          <ControlBtn variant="start" isDisabled={isLoading} onClick={handleStart} />
        )}
      </div>
    </Area.Section>
  );
}
