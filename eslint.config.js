import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sortImport from 'eslint-plugin-import';
import sortKeys from 'eslint-plugin-sort-keys';
import importNewlines from 'eslint-plugin-import-newlines';

export default tseslint.config(
  { ignores: ['dist', 'nodu_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierRecommended],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: sortImport,
      'sort-keys': sortKeys,
      'import-newlines': importNewlines,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      semi: ['error', 'always'],
      'import-newlines/enforce': ['error', { items: 40, 'max-len': 120 }],
      'no-console': 'error',
      'no-dupe-keys': 2,
      'no-empty-pattern': 2,
      'no-sparse-arrays': 2,
      'no-use-before-define': 2,
      'no-unused-vars': 2,
      'block-scoped-var': 2,
      'default-case': 2,
      eqeqeq: ['error', 'always'],
      'new-cap': ['error', { newIsCap: true }],
      'no-var': 'error',
      'prefer-const': 'error',
      'sort-keys': 0,
      '@typescript-eslint/no-explicit-any': ['off'],
      'sort-keys/sort-keys-fix': 'error',
      'import/order': [
        1,
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          pathGroupsExcludedImportTypes: ['react'],
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: 'react',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: 'assets/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'components/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'contexts/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'hooks/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'pages/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: 'styles/**',
              position: 'after',
            },
          ],
        },
      ],
    },
  },
);
