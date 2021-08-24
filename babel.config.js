module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@utils': './src/utils',
          '@containers': './src/containers',
          '@styles': './src/styles',
          '@locale': './src/locale',
          '@assets': './src/assets',
          '@store': './src/store',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@nativeModules': './src/nativeModules',
        },
      },
    ],
  ],
};
