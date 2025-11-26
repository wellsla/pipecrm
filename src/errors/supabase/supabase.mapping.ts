import { createAppError } from '../app/app.mapping'

import type { PostgrestError, AuthError } from '@supabase/supabase-js'
import type { AppError } from '../../types/error'

export const mapSupabaseAuthError = (error: AuthError): AppError => { 
  if (error.message.toLowerCase().includes('invalid login credentials')) {
    return createAppError({
      code: 'AUTH_ERROR',
      origin: 'SUPABASE',
      message: 'E-mail ou senha inválidos.',
      details: { supabase: error },
      userFriendly: true,
    })
  }

  return createAppError({
    code: 'SERVER_ERROR',
    origin: 'SUPABASE',
    message: 'Erro ao autenticar. Tente novamente mais tarde.',
    details: { supabase: error },
    userFriendly: true,
  })
}

export const mapSupabasePostgrestError = (error: PostgrestError): AppError => {
  if (error.code === 'PGRST301') {
    return createAppError({
      code: 'FORBIDDEN',
      origin: 'SUPABASE',
      message: 'Você não tem permissão para acessar este recurso.',
      details: { supabase: error },
      userFriendly: true,
    })
  }

  return createAppError({
    code: 'SERVER_ERROR',
    origin: 'SUPABASE',
    message: 'Erro ao comunicar com o servidor.',
    details: { supabase: error },
    userFriendly: true,
  })
}
