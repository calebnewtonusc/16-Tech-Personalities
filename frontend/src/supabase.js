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

  // Create a mock client that supports method chaining
  // Returns empty data for all queries so fallback logic triggers
  const mockQueryBuilder = {
    select: function() { return this; },
    insert: function() { return this; },
    update: function() { return this; },
    upsert: function() { return this; },
    delete: function() { return this; },
    eq: function() { return this; },
    neq: function() { return this; },
    gt: function() { return this; },
    lt: function() { return this; },
    gte: function() { return this; },
    lte: function() { return this; },
    like: function() { return this; },
    ilike: function() { return this; },
    is: function() { return this; },
    in: function() { return this; },
    contains: function() { return this; },
    containedBy: function() { return this; },
    range: function() { return this; },
    match: function() { return this; },
    not: function() { return this; },
    or: function() { return this; },
    filter: function() { return this; },
    order: function() { return this; },
    limit: function() { return this; },
    offset: function() { return this; },
    single: function() { return Promise.resolve({ data: null, error: { message: 'No Supabase credentials' } }); },
    maybeSingle: function() { return Promise.resolve({ data: null, error: null }); },
    then: function(resolve) {
      return Promise.resolve({ data: [], error: null }).then(resolve);
    },
  };

  supabase = {
    from: () => ({ ...mockQueryBuilder }),
  };
}

export { supabase };
