import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'c-bg': 'hsl(var(--c-bg))',
        'c-fg': 'hsl(var(--c-fg))',
        'c-primary': {
          DEFAULT: 'hsl(var(--c-primary))',
          text: 'hsl(var(--c-primary-text))',
        },
        'c-secondary': {
          DEFAULT: 'hsl(var(--c-secondary))',
          text: 'hsl(var(--c-secondary-text))',
          fg: 'hsl(var(--c-secondary-fg))',
        },
        'c-line': {
          DEFAULT: 'hsl(var(--c-line))',
          low: 'hsl(var(--c-line-low))',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
