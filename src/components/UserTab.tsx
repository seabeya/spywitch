type UserTabProps = {
  user: string;
  activeTab: string;
  handleTabClick: (tab: string) => void;
};

export default function UserTab({ user, activeTab, handleTabClick }: UserTabProps) {
  const active = activeTab === user;

  return (
    <button
      onClick={() => handleTabClick(user)}
      className={`
    rounded-sm border-b-2 border-gray-600 bg-gray-800 px-2 py-1 text-sm text-gray-300 hover:bg-gray-600 xl:text-base
    ${active ? '!border-green-500 !bg-gray-600 !text-gray-100' : ''}
    `}
    >
      {user.substring(0, 25)}
    </button>
  );
}
