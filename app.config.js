import 'dotenv/config';

export default {
  expo: {
    name: "my-expo-app",
    slug: "my-expo-app",
    version: "1.0.0",
    scheme: "my-expo-app",
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro"
    },
    experiments: {
      tsconfigPaths: true
    },
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ],
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.googleMapApiKey
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      config: {
        googleMaps: {
          apiKey: process.env.googleMapApiKey
        }
      }
    }
  }
};