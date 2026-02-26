import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, ActivityIndicator, View, Platform } from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import LoginScreen from './src/screens/LoginScreen';
import { useAuth } from './src/hooks/useAuth';

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  // TEMPORARY: Skip auth on web for preview
  const skipAuth = Platform.OS === 'web';

  // Show loading spinner while checking auth state
  if (loading && !skipAuth) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2c2c2c" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {(isAuthenticated || skipAuth) ? <ChatScreen /> : <LoginScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
