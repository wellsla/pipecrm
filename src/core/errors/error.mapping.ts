import type { AuthError } from '@supabase/supabase-js';

export interface MappedError {
  message: string;
  code?: string;
}

export function mapSupabaseError(error: AuthError): MappedError {
  if (error.code === 'invalid_credentials') {
    return {
      message: 'E-mail ou senha inválidos',
      code: error.code,
    };
  }

  return {
    message: `Ocorreu um erro inesperado: ${error.message}`,
    code: error.code,
  };
}