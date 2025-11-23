import { createClient, type SupabaseClient, type PostgrestError } from '@supabase/supabase-js';

import type { Database } from '@/core/db/supabase.types';
import type { AppError } from '@/core/errors/app/error.types';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_KEY as string;

if (!url || !anonKey) {
  const appError: AppError = {
    code: 'CONFIG_ERROR',
    origin: 'ENVIRONMENT',
    message: 'Configuração do Supabase ausente.',
    userFriendly: true,
  }
  throw appError
}

export const supabase: SupabaseClient<Database> = createClient<Database>(url, anonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true,
  },
});

export type SupabaseError = PostgrestError | null;
