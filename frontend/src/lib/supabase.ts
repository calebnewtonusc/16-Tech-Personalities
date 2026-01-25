// Supabase client configuration for Next.js App Router
import { createBrowserClient } from '@supabase/ssr';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

// Client-side Supabase client
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Server-side Supabase client for Server Components
export async function createServerComponentClient() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

// Server-side Supabase client for Server Actions and Route Handlers
export async function createServerActionClient() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}

// Database types helper
export type Database = {
  public: {
    Tables: {
      quiz_versions: {
        Row: {
          id: string;
          version: number;
          created_at: string;
          questions: any;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          version: number;
          created_at?: string;
          questions: any;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          version?: number;
          created_at?: string;
          questions?: any;
          is_active?: boolean;
        };
      };
      quiz_results: {
        Row: {
          id: string;
          user_id: string | null;
          quiz_version_id: string;
          created_at: string;
          focus_score: number;
          interface_score: number;
          change_score: number;
          decision_score: number;
          execution_score: number;
          personality_type: string;
          responses: any;
          is_public: boolean;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          quiz_version_id: string;
          created_at?: string;
          focus_score: number;
          interface_score: number;
          change_score: number;
          decision_score: number;
          execution_score: number;
          personality_type: string;
          responses: any;
          is_public?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          quiz_version_id?: string;
          created_at?: string;
          focus_score?: number;
          interface_score?: number;
          change_score?: number;
          decision_score?: number;
          execution_score?: number;
          personality_type?: string;
          responses?: any;
          is_public?: boolean;
        };
      };
      personality_profiles: {
        Row: {
          id: string;
          type_code: string;
          name: string;
          description: string;
          strengths: string[];
          challenges: string[];
          work_preferences: string[];
          updated_at: string;
        };
        Insert: {
          id?: string;
          type_code: string;
          name: string;
          description: string;
          strengths: string[];
          challenges: string[];
          work_preferences: string[];
          updated_at?: string;
        };
        Update: {
          id?: string;
          type_code?: string;
          name?: string;
          description?: string;
          strengths?: string[];
          challenges?: string[];
          work_preferences?: string[];
          updated_at?: string;
        };
      };
      tech_roles: {
        Row: {
          id: string;
          name: string;
          description: string;
          skills: string[];
          roadmap: any;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          skills: string[];
          roadmap: any;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          skills?: string[];
          roadmap?: any;
          updated_at?: string;
        };
      };
      role_scoring_weights: {
        Row: {
          id: string;
          role_id: string;
          personality_type: string;
          weight: number;
        };
        Insert: {
          id?: string;
          role_id: string;
          personality_type: string;
          weight: number;
        };
        Update: {
          id?: string;
          role_id?: string;
          personality_type?: string;
          weight?: number;
        };
      };
    };
  };
};
