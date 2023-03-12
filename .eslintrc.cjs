var tsConfigs = ['./tsconfig.json'];

var ruleOverrides = {};

module.exports = {
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@next/next/recommended',
        'prettier',
        'plugin:tailwindcss/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: tsConfigs,
      },
      plugins: ['@typescript-eslint', 'prettier'],
      rules: {
        'prettier/prettier': 'error',
      },
      files: [
        'app/**/*.ts',
        'app/**/*.tsx',
        'components/**/*.ts',
        'components/**/*.tsx',
        'pages/**/*.ts',
        'pages/**/*.tsx',
        'utils/**/*.ts',
        'utils/**/*.tsx',
      ],
    },
    {
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: tsConfigs,
      },
      plugins: ['@typescript-eslint', 'prettier'],
      rules: {
        'prettier/prettier': 'error',
      },
      files: ['e2e/**/*.spec.ts'],
    },
    {
      extends: ['eslint:recommended', 'prettier', 'esnext'],
      files: '*.mjs',
      rules: ruleOverrides,
    },
    {
      extends: ['prettier'],
      files: '*.js',
      rules: ruleOverrides,
    },
  ],
  root: true,
};
