'use client';

import { useAtomValue } from 'jotai';
import { atom_usersArr } from '@/atoms';

import UserTab from '@/components/parts/UserTab';

type UserTabsProps = {
  activeTab: string;
  handleTabClick: (tab: string) => void;
};

export default function UserTabs({ activeTab, handleTabClick }: UserTabsProps) {
  const users = useAtomValue(atom_usersArr);
  return (
    <div className="scrollbar flex max-h-36 flex-wrap gap-3 overflow-auto">
      {users.map((user) => {
        return <UserTab key={user} user={user} activeTab={activeTab} handleTabClick={handleTabClick} />;
      })}
    </div>
  );
}
