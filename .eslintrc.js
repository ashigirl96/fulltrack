module.exports = {
  root: true,
  plugins: [
    'unused-imports',
    'react',
    'react-hooks',
    '@typescript-eslint',
    'import',
    'unused-imports',
  ],
  env: {
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'next/core-web-vitals',
  ],
  rules: {
    'no-console': 'off',
    'no-undef': 'off',
    'react/jsx-uses-vars': 1,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    // react hooks 関連
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)',
      },
    ],

    // import 関連
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'sort-imports': 0,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    'import/prefer-default-export': 'off',
  },
  parser: '@typescript-eslint/parser',
}
