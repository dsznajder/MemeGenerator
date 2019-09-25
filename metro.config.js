/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 */

// eslint-disable-next-line import/no-commonjs
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
}
