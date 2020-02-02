module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/label-has-associated-control': [2, { assert: 'either' }],
    'jsx-a11y/label-has-for': [2, { required: { some: ['nesting', 'id'] } }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['preferButton'],
      },
    ],
  },
  globals: {
    fetch: 'readonly',
  },
};
