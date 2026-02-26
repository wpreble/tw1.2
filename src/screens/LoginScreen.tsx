import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { authService } from '../services/auth';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);

  useEffect(() => {
    checkAppleAuth();
  }, []);

  const checkAppleAuth = async () => {
    const available = await authService.isAppleAuthAvailable();
    setAppleAuthAvailable(available);
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { data, error } = await authService.signInWithGoogle();

      if (error) {
        Alert.alert('Sign In Failed', error.message || 'Could not sign in with Google');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      const { data, error } = await authService.signInWithApple();

      if (error) {
        Alert.alert('Sign In Failed', error.message || 'Could not sign in with Apple');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>✝️</Text>
        <Text style={styles.title}>The Way</Text>
        <Text style={styles.subtitle}>
          Disconnect from the world{'\n'}
          Renew your mind{'\n'}
          Clarify your vision
        </Text>
      </View>

      {/* Auth Buttons */}
      <View style={styles.authContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#2c2c2c" />
        ) : (
          <>
            {/* Google Sign-In */}
            <TouchableOpacity
              style={styles.authButton}
              onPress={handleGoogleSignIn}
              disabled={loading}
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.authButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Apple Sign-In (iOS only) */}
            {appleAuthAvailable && (
              <TouchableOpacity
                style={[styles.authButton, styles.appleButton]}
                onPress={handleAppleSignIn}
                disabled={loading}
              >
                <Text style={styles.appleIcon}></Text>
                <Text style={[styles.authButtonText, styles.appleButtonText]}>
                  Continue with Apple
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          A spiritual formation tool{'\n'}
          Not a replacement for the Holy Spirit
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f0',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 40,
  },
  logo: {
    fontSize: 72,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#2c2c2c',
    letterSpacing: 2,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.5,
  },
  authContainer: {
    paddingHorizontal: 40,
    gap: 16,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0d8',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c2c2c',
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4285F4',
  },
  appleButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  appleButtonText: {
    color: '#fff',
  },
  appleIcon: {
    fontSize: 20,
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  footerText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});
