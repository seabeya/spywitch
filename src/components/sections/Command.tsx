'use client';

import Area from '@/components/wrappers/Area';
import Label from '@/components/parts/Label';
import Input from '@/components/parts/Input';
import ControlBtn from '@/components/parts/ControlBtn';

import { useAtom, useAtomValue } from 'jotai';
import { atom_users, atom_channels, atom_status, atom_isLoading, atom_idbConn, atom_tmiConn } from '@/atoms';

import tmi from 'tmi.js';
import { deleteDB, openDB } from 'idb';

export default function Command() {
  const userItems = useAtomValue(atom_users);
  const channelItems = useAtomValue(atom_channels);

  // Start handler {
  const [isLoading, setIsLoading] = useAtom(atom_isLoading);

  const [idbConn, setIdbConn] = useAtom(atom_idbConn);
  const [tmiConn, setTmiConn] = useAtom(atom_tmiConn);
  const [status, setStatus] = useAtom(atom_status);

  const handleStart = async () => {
    // return; if inputs are empty
    if (userItems.length === 0 || channelItems.length === 0) {
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
      client.on('message', async (channel, tags, message) => {
        // Only save the messages from the users we are tracking:
        if (userItems.includes(tags['username'] as string)) {
          await idb.add('logs', {
            uniqueId: tags['id'],
            user: tags['username'],
            channel: channel.substring(1),
            message,
            date: new Date(),
          });
        }
      });

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
      </Label>
      <Label title="Channels:" htmlFor="channels" desc="the channels where you want to track the users">
        <Input id="channels" placeholder="Enter channel names separated with spaces." itemsAtom={atom_channels} />
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
