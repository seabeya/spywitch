const SYS_PAGES = {
  control: {
    name: 'control',
    label: 'Control',
    path: '/',
  },
  logs: {
    name: 'logs',
    label: 'Logs',
    path: '/logs',
  },
} as const;

const SYS_PAGE_GROUPS = {
  side_nav: [SYS_PAGES.control, SYS_PAGES.logs],
};

export { SYS_PAGES, SYS_PAGE_GROUPS };
