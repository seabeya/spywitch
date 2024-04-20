import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        txt: {
          DEFAULT: '#fff', // white
          light: '#f5f5f5', // neutral-100
          low: '#d4d4d4', // neutral-300
          lower: '#a3a3a3', // neutral-400
        },
        brdr: {
          light: '#404040', // neutral-700
          DEFAULT: '#262626', // neutral-800
          dark: '#171717', // neutral-900
        },
      },
      borderRadius: {
        outher: '12px',
        inner: '6px',
      },
    },
    container: {
      center: true,
      padding: '5px',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
export default config;
