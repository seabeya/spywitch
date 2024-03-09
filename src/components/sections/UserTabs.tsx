'use client';

import { useAtomValue } from 'jotai';
import { atom_users } from '@/atoms';

import Area from '@/components/wrappers/Area';
import UserTab from '@/components/parts/UserTab';

type UserTabsProps = {
  activeTab: string;
  handleTabClick: (tab: string) => void;
};

export default function UserTabs({ activeTab, handleTabClick }: UserTabsProps) {
  const users = useAtomValue(atom_users);

  return (
    <Area.Section title="Users">
      <div className="scrollbar flex max-h-36 flex-wrap gap-2 overflow-auto rounded-sm border border-c_border1 bg-c_body p-1">
        {users.map((user) => {
          return <UserTab key={user} user={user} activeTab={activeTab} handleTabClick={handleTabClick} />;
        })}
      </div>
    </Area.Section>
  );
}
