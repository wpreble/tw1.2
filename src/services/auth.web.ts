// Web-compatible auth service - no native Google/Apple Sign-In modules
import { supabase } from './supabase';

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signInWithGoogle() {
    return { data: null, error: new Error('Google Sign-In is not supported in web preview') };
  }

  async signInWithApple() {
    return { data: null, error: new Error('Apple Sign-In is not supported in web preview') };
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Sign Out Error:', error);
      return { error };
    }
  }

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

  async isAppleAuthAvailable() {
    return false;
  }
}

export const authService = AuthService.getInstance();
