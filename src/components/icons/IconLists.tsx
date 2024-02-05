function IconLists({ className }: { className?: string }) {
  return (
    <svg fill="none" viewBox="2 2 20 20" height="1em" width="1em" className={className}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 11a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M11 14a1 1 0 011 1v6h2v-6a3 3 0 00-3-3H5a3 3 0 00-3 3v6h2v-6a1 1 0 011-1h6zM22 11h-6v2h6v-2zM16 15h6v2h-6v-2zM22 7h-6v2h6V7z"
      />
    </svg>
  );
}

export default IconLists;
