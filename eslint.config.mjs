import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    plugins: ['boundaries'],
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          type: 'shared',
          pattern: ['src/lib/**/*'],
          mode: 'full',
        },
        {
          type: 'feature',
          pattern: ['src/features/*/**/*'],
          capture: ['featureName', '_', '_'],
          mode: 'full',
        },
        {
          type: 'app-layout',
          pattern: ['src/app/*'],
          capture: ['fileName'],
          mode: 'full',
        },
        {
          type: 'app',
          pattern: ['src/app/**/*'],
          capture: ['pathToFile', '_'],
          mode: 'full',
        },
      ],
    },
    rules: {
      'boundaries/no-unknown': ['error'],
      'boundaries/no-unknown-files': ['error'],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              // In "shared", allow imports from "shared" only.
              from: ['shared'],
              allow: ['shared'],
            },
            {
              // In "feature", allow imports from "shared" and within the same "feature" directory.
              from: ['feature'],
              allow: ['shared', ['feature', { featureName: '${featureName}' }]],
            },
            {
              // In "app-layout"/layout.tsx, only allow "app-layout"/globals.css.
              from: [['app-layout', { fileName: ['layout.tsx'] }]],
              allow: [['app-layout', { fileName: ['globals.css'] }]],
            },
            {
              // In "app", allow imports from "shared", "feature", and within the same directory (sibling files).
              from: ['app'],
              allow: ['shared', 'feature', ['app', { pathToFile: '${pathToFile}' }]],
            },
          ],
        },
      ],
    },
  }),
];

export default eslintConfig;
