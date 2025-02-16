import IconHistory from '@/components/icons/history';
import IconHome from '@/components/icons/home';
import IconMonitor from '@/components/icons/monitor';
import IconSetup from '@/components/icons/setup';

const SYS_PAGES = {
  home: {
    name: 'home',
    label: 'Home',
    path: '/',
    icon: IconHome,
  },
  setup: {
    name: 'setup',
    label: 'Setup',
    path: '/setup',
    icon: IconSetup,
  },
  monitor: {
    name: 'monitor',
    label: 'Monitor',
    path: '/monitor',
    icon: IconMonitor,
  },
  history: {
    name: 'history',
    label: 'History',
    path: '/history',
    icon: IconHistory,
  },
} as const;

const SYS_PAGE_GROUPS = {
  navbar: [SYS_PAGES.home, SYS_PAGES.setup, SYS_PAGES.monitor, SYS_PAGES.history],
};

export { SYS_PAGES, SYS_PAGE_GROUPS };
