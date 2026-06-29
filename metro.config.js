const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.watchFolders = [__dirname];
config.resolver.blockList = [/\.local\/.*/, /\.git\/.*/];

if (
  process.env.EXPO_PUBLIC_PLATFORM === "web" 
) {
  config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    "@stripe/stripe-react-native": require.resolve("mockjs"),
  };
}

module.exports = config;
