'use client';

import Label from '@/components/parts/Label';
import Input from '@/components/parts/Input';
import ControlBtn from '@/components/parts/ControlBtn';

import { useAtom, useSetAtom } from 'jotai';
import {
  atom_channelsArr,
  atom_channelsInput,
  atom_idbConn,
  atom_isLoading,
  atom_isSpyOn,
  atom_tmiConn,
  atom_usersArr,
  atom_usersInput,
} from '@/atoms';
import { getSanitizedInput, getUniqueItems, getValidItems } from '@/lib/utils';

import tmi from 'tmi.js';
import { deleteDB, openDB } from 'idb';

export default function Command() {
  // Input handlers {
  const [usersInput, setUsersInput] = useAtom(atom_usersInput);
  const [channelsInput, setChannelsInput] = useAtom(atom_channelsInput);

  const handleUsersChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUsersInput(event.target.value);
  };

  const handleChannelsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChannelsInput(event.target.value);
  };
  // }

  // Start handler {
  const [isLoading, setIsLoading] = useAtom(atom_isLoading);

  const setUsers = useSetAtom(atom_usersArr);
  const setChannels = useSetAtom(atom_channelsArr);
  const [idbConn, setIdbConn] = useAtom(atom_idbConn);
  const [tmiConn, setTmiConn] = useAtom(atom_tmiConn);
  const [isSpyOn, setIsSpyOn] = useAtom(atom_isSpyOn);

  const handleStart = async () => {
    // Get valid input values
    const usersArr = getValidItems(getUniqueItems(getSanitizedInput(usersInput)));
    const channelsArr = getValidItems(getUniqueItems(getSanitizedInput(channelsInput)));

    // return; if inputs are empty
    if (usersArr.length === 0 || channelsArr.length === 0) {
      return;
    }

    // Set global loading state:
    setIsLoading(true);

    // Create a new tmi client:
    const client = new tmi.Client({
      channels: channelsArr,
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

      // Set the users and channels as global states (these are used to display the data):
      setUsers(usersArr);
      setChannels(channelsArr);

      // Listen to messages:
      client.on('message', async (channel, tags, message) => {
        await idb.add('logs', {
          uniqueId: tags['id'],
          user: tags['username'],
          channel: channel.substring(1),
          message,
          date: new Date(),
        });
      });
    } catch (_) {
      console.log('Something went wrong while starting the application. Please refresh the page and try again.');
    } finally {
      // Application is ready state:
      setIsSpyOn(true);
      setIsLoading(false);
    }
  };
  // }

  // Stop handler {
  const handleStop = async () => {
    setIsLoading(true);

    try {
      await tmiConn.disconnect();

      setIsSpyOn(false);

      setTmiConn({} as tmi.Client);

      setUsers([]);
      setChannels([]);

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
    <>
      <Label title="Users:" desc="the users you are going to track">
        <Input placeholder="Enter usernames separated with spaces." value={usersInput} onChange={handleUsersChange} />
      </Label>
      <Label title="Channels:" desc="the channels where you want to track the users">
        <Input
          placeholder="Enter channel names separated with spaces."
          value={channelsInput}
          onChange={handleChannelsChange}
        />
      </Label>
      <div className="mt-2 flex justify-end gap-2 xl:mt-4">
        {isSpyOn ? (
          <ControlBtn variant="stop" isDisabled={isLoading} onClick={handleStop} />
        ) : (
          <ControlBtn variant="start" isDisabled={isLoading} onClick={handleStart} />
        )}
      </div>
    </>
  );
}
