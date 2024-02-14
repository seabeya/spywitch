'use client';

import Label from '@/components/parts/Label';
import Input from '@/components/parts/Input';
import ControlBtn from '@/components/parts/ControlBtn';

import { useAtom, useSetAtom } from 'jotai';
import {
  atom_channelsArr,
  atom_channelsInput,
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
  const [tmiConn, setTmiConn] = useAtom(atom_tmiConn);
  const [isSpyOn, setIsSpyOn] = useAtom(atom_isSpyOn);

  const handleStart = async () => {
    const usersArr = getValidItems(getUniqueItems(getSanitizedInput(usersInput)));
    const channelsArr = getValidItems(getUniqueItems(getSanitizedInput(channelsInput)));

    if (usersArr.length === 0 || channelsArr.length === 0) {
      return;
    }

    setIsLoading(true);

    // Tmi {
    const client = new tmi.Client({
      channels: channelsArr,
    });

    client
      .connect()
      .then(() => {
        setTmiConn(client);

        setUsers(usersArr);
        setChannels(channelsArr);

        setIsSpyOn(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // }

    // Idb Setup {
    await deleteDB('spywitch');
    const idb = await openDB('spywitch', 1, {
      upgrade(db) {
        const store = db.createObjectStore('logs', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('user', 'user');
      },
    });
    // }

    // Tmi & Idb {
    client.on('message', async (channel, tags, message) => {
      await idb.add('logs', {
        uniqueId: tags['id'],
        user: tags['username'],
        channel: channel.substring(1),
        message,
        date: new Date(),
      });
    });
    // }
  };
  // }

  // Stop handler {
  const handleStop = () => {
    setIsLoading(true);

    tmiConn
      .disconnect()
      .then(() => {
        setIsSpyOn(false);

        setTmiConn({} as tmi.Client);

        setUsers([]);
        setChannels([]);

        deleteDB('spywitch');
      })
      .finally(() => {
        setIsLoading(false);
      });
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
