import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from './supabase';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: ''; // Will be set via environment variable in production
  iosClientId: ''; // Will be set via environment variable in production
});

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });

        if (error) throw error;
        return { data, error: null };
      } else {
        throw new Error('No ID token found');
      }
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      return { data: null, error };
    }
  }

  /**
   * Sign in with Apple (iOS only)
   */
  async signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential.identityToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
        });

        if (error) throw error;

        // Update user metadata with Apple's fullName if provided
        if (credential.fullName && data.user) {
          const fullName = [
            credential.fullName.givenName,
            credential.fullName.familyName,
          ]
            .filter(Boolean)
            .join(' ');

          if (fullName) {
            await supabase.auth.updateUser({
              data: { full_name: fullName },
            });
          }
        }

        return { data, error: null };
      } else {
        throw new Error('No identity token found');
      }
    } catch (error: any) {
      console.error('Apple Sign-In Error:', error);
      return { data: null, error };
    }
  }

  /**
   * Sign out
   */
  async signOut() {
    try {
      // Sign out from Google if signed in
      if (await GoogleSignin.isSignedIn()) {
        await GoogleSignin.signOut();
      }

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      return { error: null };
    } catch (error: any) {
      console.error('Sign Out Error:', error);
      return { error };
    }
  }

  /**
   * Get current session
   */
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { session: data.session, error: null };
    } catch (error: any) {
      console.error('Get Session Error:', error);
      return { session: null, error };
    }
  }

  /**
   * Get current user
   */
  async getUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { user: data.user, error: null };
    } catch (error: any) {
      console.error('Get User Error:', error);
      return { user: null, error };
    }
  }

  /**
   * Check if Apple Sign In is available (iOS 13+)
   */
  async isAppleAuthAvailable() {
    if (Platform.OS !== 'ios') return false;
    return await AppleAuthentication.isAvailableAsync();
  }
}

export const authService = AuthService.getInstance();
