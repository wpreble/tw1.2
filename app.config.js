export default {
  expo: {
    name: "The Way",
    slug: "the-way",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    extra: {
      apiUrl: process.env.API_URL || "http://localhost:3000",
      supabaseUrl: process.env.SUPABASE_URL || "https://gbcptmhtegfbntbhithe.supabase.co",
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "sb_publishable_r_y3Ccjz6UJoe1ijd6GfKg_oMJ-T_DO",
      eas: {
        projectId: "your-project-id-here" // Will be set by eas build:configure
      }
    },
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.theway.app",
      buildNumber: "1.0.0"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.theway.app",
      versionCode: 1,
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-apple-authentication",
      "@react-native-google-signin/google-signin"
    ],
    scheme: "theway"
  }
};
