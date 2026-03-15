import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const createDummyClient = () => ({
  from: () => ({
    select: () => ({
      order: () => ({
        limit: async () => ({ data: [], error: { message: "Supabase not configured" } })
      })
    }),
    insert: async () => ({ data: null, error: { message: "Supabase not configured" } })
  }),
  storage: {
    from: () => ({
      upload: async () => ({ data: null, error: { message: "Supabase not configured" } }),
      getPublicUrl: () => ({ data: { publicUrl: "" } })
    })
  }
});

// Create a single supabase client or a fallback to prevent crashes if .env is missing
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createDummyClient() as any;
