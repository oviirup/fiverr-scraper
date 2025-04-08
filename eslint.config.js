import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tailwind from 'eslint-plugin-tailwindcss';
import ts from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
export default [
  prettier,
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
    },
  },
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  {
    plugins: {
      onlyWarn,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      semi: 'warn',
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      eqeqeq: 'warn',
    },
  },
  {
    ignores: ['eslint.config.js', 'dist/**', 'build/**', '.plasmo/**'],
  },
];
