function IconSpy({ className }: { className?: string }) {
  return (
    <svg fill="none" viewBox="1 2 22 21" height="1em" width="1em" className={className}>
      <path
        fill="currentColor"
        d="M5.636 20.364a9 9 0 1112.728 0l1.414 1.414A10.966 10.966 0 0023 14c0-6.075-4.925-11-11-11S1 7.925 1 14c0 3.038 1.231 5.788 3.222 7.778l1.414-1.414z"
      />
      <path fill="currentColor" d="M16.95 18.95a7 7 0 10-9.9 0l1.415-1.414a5 5 0 117.071 0l1.414 1.414z" />
      <path fill="currentColor" d="M14.121 16.121a3 3 0 10-4.243 0l1.415-1.414a1 1 0 111.414 0l1.414 1.414z" />
    </svg>
  );
}

export default IconSpy;
