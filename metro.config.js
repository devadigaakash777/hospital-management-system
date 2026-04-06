const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const config = mergeConfig(getDefaultConfig(__dirname), {});
module.exports = withNativeWind(config, { input: './global.css' });


// Metro is React Native's bundler (like webpack for web)
// withNativeWind tells Metro to process your global.css file and make Tailwind styles available
// Without this, Metro doesn't know what to do with CSS files