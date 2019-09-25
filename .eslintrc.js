module.exports = {
  plugins: ['jest', 'react-native', 'sort-imports-es6-autofix'],
  extends: ['satya164', 'plugin:jest/recommended', 'plugin:react-native/all'],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.android.tsx', '.ios.tsx', '.native.js'],
      },
    },
  },
  rules: {
    'import/first': ['error', 'always'],
    'import/no-duplicates': ['error', 'always'],
    'import/no-unresolved': ['error', { caseSensitive: true, ignore: ['^~/'] }],
    'jest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        jsxBracketSameLine: false,
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
};
