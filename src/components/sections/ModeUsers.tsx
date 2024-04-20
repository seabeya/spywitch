import Label from '@/components/shared/Label';
import InputBox from '@/components/InputBox';

export default function ModeUsers() {
  return (
    <>
      <Label htmlFor="users" title="Users" desc="the users you are going to track">
        <InputBox
          id="users"
          placeholder="Enter user names separated with spaces."
          items={[]}
          isLocked={false}
          getItems={() => {}}
        />
      </Label>
      <Label htmlFor="channels" title="Channels" desc="the channels where you want to track the users">
        <InputBox
          id="channels"
          placeholder="Enter channel names separated with spaces."
          items={[]}
          isLocked={false}
          getItems={() => {}}
        />
      </Label>
    </>
  );
}
