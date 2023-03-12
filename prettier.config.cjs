/**
 * Options for Prettier.
 *
 * @see https://prettier.io/docs/en/options.html
 */

module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
};
