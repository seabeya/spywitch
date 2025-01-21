const SYS_PAGES = {
  spy: {
    name: 'spy',
    label: 'Spy',
    path: '/',
  },
  logs: {
    name: 'logs',
    label: 'Logs',
    path: '/logs',
  },
} as const;

const SYS_PAGE_GROUPS = {
  side_nav: [SYS_PAGES.spy, SYS_PAGES.logs],
};

export { SYS_PAGES, SYS_PAGE_GROUPS };
