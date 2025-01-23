import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
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
          high: 'hsl(var(--c-line-high))',
        },
      },
      spacing: {
        's-gap': 'var(--s-gap)',
        's-nav-height': 'var(--s-nav-height)',
      },
    },
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
} satisfies Config;
