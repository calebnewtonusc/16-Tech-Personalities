import { createClient } from '@supabase/supabase-js';

// Support both REACT_APP_ (local) and NEXT_PUBLIC_ (Vercel) prefixes
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('Supabase Config:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey?.length,
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  keyPreview: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'MISSING',
});

// Create Supabase client only if credentials are provided
// Otherwise, app will work in client-side only mode with localStorage
let supabase = null;

if (supabaseAnonKey && supabaseAnonKey.length >= 100) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client initialized successfully');
} else {
  console.warn('Supabase credentials not configured - running in client-side only mode (localStorage)');
  // Create a mock client that returns empty results
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      upsert: () => Promise.resolve({ data: null, error: null }),
    }),
  };
}

export { supabase };
