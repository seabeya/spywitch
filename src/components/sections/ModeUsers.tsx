import Label from '@/components/shared/Label';
import InputBox from '@/components/InputBox';

import { useItemsStore } from '@/store';

export default function ModeUsers() {
  const Users = useItemsStore((state) => state.items1);
  const Channels = useItemsStore((state) => state.items2);

  const getUsers = (items: string[]) => {
    useItemsStore.setState({ items1: items });
  };

  const getChannels = (items: string[]) => {
    useItemsStore.setState({ items2: items });
  };

  return (
    <>
      <Label htmlFor="users" title="Users" desc="the users you are going to track">
        <InputBox
          id="users"
          placeholder="Enter user names separated with spaces."
          items={Users}
          isLocked={false}
          getItems={getUsers}
        />
      </Label>
      <Label htmlFor="channels" title="Channels" desc="the channels where you want to track the users">
        <InputBox
          id="channels"
          placeholder="Enter channel names separated with spaces."
          items={Channels}
          isLocked={false}
          getItems={getChannels}
        />
      </Label>
    </>
  );
}
