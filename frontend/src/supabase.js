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

if (!supabaseAnonKey || supabaseAnonKey.length < 100) {
  console.error('ERROR: Invalid or missing Supabase anonymous key! Please add REACT_APP_SUPABASE_ANON_KEY to .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
