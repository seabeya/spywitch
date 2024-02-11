import Label from '@/components/parts/Label';
import Input from '@/components/parts/Input';
import SpyBtn from '@/components/parts/SpyBtn';

export default function Command() {
  return (
    <>
      <Label title="Users:" desc="the users you are going to track">
        <Input placeholder="Enter usernames separated with spaces." />
      </Label>
      <Label title="Channels:" desc="the channels where you want to track the users">
        <Input placeholder="Enter channel names separated with spaces." />
      </Label>
      <div className="mt-2 flex justify-end xl:mt-4">
        <SpyBtn label="Start" />
      </div>
    </>
  );
}
