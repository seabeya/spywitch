const SYS_PAGES = {
  home: {
    name: 'home',
    label: 'Home',
    path: '/',
  },
  setup: {
    name: 'setup',
    label: 'Setup',
    path: '/setup',
  },
  monitor: {
    name: 'monitor',
    label: 'Monitor',
    path: '/monitor',
  },
  history: {
    name: 'history',
    label: 'History',
    path: '/history',
  },
} as const;

const SYS_PAGE_GROUPS = {
  navbar: [SYS_PAGES.home, SYS_PAGES.setup, SYS_PAGES.monitor, SYS_PAGES.history],
};

export { SYS_PAGES, SYS_PAGE_GROUPS };
