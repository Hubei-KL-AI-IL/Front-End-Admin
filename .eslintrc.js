module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'array-bracket-newline': ['error', { multiline: true, minItems: 6 }],
  },
};
