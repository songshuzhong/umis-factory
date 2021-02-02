module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended']
};
