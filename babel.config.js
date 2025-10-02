module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    '@babel/plugin-syntax-flow',
    '@babel/plugin-transform-flow-strip-types',
  ],
  overrides: [
    {
      test: /node_modules\/react-native\/.*\.js$/,
      plugins: [
        '@babel/plugin-transform-flow-strip-types',
        '@babel/plugin-syntax-flow'
      ],
    },
  ],
};
