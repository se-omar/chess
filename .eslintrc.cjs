module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 'off',
    indent: 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
  },
};
