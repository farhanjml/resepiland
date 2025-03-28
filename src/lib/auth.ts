import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { supabase } from './supabase';

export async function signUp(email: string, password: string, name: string): Promise<AuthResponse> {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  return supabase.auth.signOut();
}

export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  return supabase.auth.resetPasswordForEmail(email);
}

export async function updatePassword(newPassword: string): Promise<AuthResponse> {
  return supabase.auth.updateUser({ password: newPassword });
}