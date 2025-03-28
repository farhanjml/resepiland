import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'resepi-land-auth',
    storage: localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false // Changed to false to prevent automatic session detection
  }
});

// Add error handling for fetch failures
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
  try {
    const response = await originalFetch(input, init);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};