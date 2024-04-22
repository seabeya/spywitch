import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SpyWitch',
    short_name: 'SpyWitch',
    description: 'An open-source live data tracker for Twitch.tv',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/icons/icon-96x96.png',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        src: '/icons/icon-192x192.png',
        type: 'image/png',
        sizes: '192x192',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
  };
}
