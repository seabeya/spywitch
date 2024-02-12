'use client';

import Label from '@/components/parts/Label';
import Input from '@/components/parts/Input';
import SpyBtn from '@/components/parts/SpyBtn';

import { useAtom } from 'jotai';
import { atom_channelsInput, atom_usersInput } from '@/atoms';

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
      <div className="mt-2 flex justify-end xl:mt-4">
        <SpyBtn label="Start" />
      </div>
    </>
  );
}
