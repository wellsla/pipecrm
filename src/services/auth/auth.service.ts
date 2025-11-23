import { ZodError } from 'zod';
import { supabase } from '@/core/db/supabase.client';
import {
  signInSchema,
  signUpSchema,
  mfaCodeSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './auth.schemas';
import { isAppError } from '@/core/errors/app/error.mapping';
import { mapZodError } from '@/core/errors/zod/error.mapping';
import { mapSupabaseAuthError } from '@/core/errors/supabase/error.mapping';
import { mapUnknownError } from '@/core/errors/unknown/error.mapping';
import { trackError } from '@/core/errors/error.tracking';

import type {
  SignInPayload,
  SignUpPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthUser,
} from './auth.types';
import type { AuthError } from '@supabase/supabase-js';
import type { AppError } from '@/core/errors/app/error.types';

export class AuthService {
  public async signIn(payload: SignInPayload): Promise<AuthUser> {
    try {
      const parsed = signInSchema.parse(payload)

      const {
        data,
        error,
      }: { data: { user: { id: string; email?: string | null } | null }; error: AuthError | null } =
        await supabase.auth.signInWithPassword({
          email: parsed.email,
          password: parsed.password,
        })

      if (error) {
        const appError = mapSupabaseAuthError(error)
        throw appError
      }

      if (!data.user || !data.user.id) {
        const appError: AppError = {
          code: 'SERVER_ERROR',
          origin: 'SERVICE',
          message: 'Sessão inválida após o login.',
          userFriendly: true,
        }
        throw appError
      }

      const authUser: AuthUser = {
        id: data.user.id,
        email: data.user.email ?? parsed.email,
        isAdmin: false,
      }

      return authUser
    } catch (error: unknown) {
      let appError: AppError

      if (error instanceof ZodError) {
        appError = mapZodError(error)
      } else if (isAppError(error)) {
        appError = error
      } else {
        appError = mapUnknownError(error)
      }

      trackError(appError, 'auth.signIn')
      throw appError
    }
  }

  public async verifyMfa(code: string): Promise<AuthUser> {
    try {
      const parsed = mfaCodeSchema.parse(code)
      
      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !userData.user?.email) {
        const appError: AppError = {
          code: 'AUTH_ERROR',
          origin: 'SERVICE',
          message: 'Não foi possível recuperar o usuário para verificação do código.',
          details: { userError },
          userFriendly: true,
        }
        throw appError
      }

      const {
        data,
        error,
      } = await supabase.auth.verifyOtp({
        email: userData.user.email,
        token: parsed,
        type: 'email',
      })

      if (error) {
        const appError = mapSupabaseAuthError(error)
        throw appError
      }

      const finalUser = data.user ?? userData.user

      if (!finalUser || !finalUser.id) {
        const appError: AppError = {
          code: 'SERVER_ERROR',
          origin: 'SERVICE',
          message: 'Sessão inválida após validar o código.',
          userFriendly: true,
        }
        throw appError
      }

      const authUser: AuthUser = {
        id: finalUser.id,
        email: finalUser.email ?? userData.user.email,
        isAdmin: false,
      }

      return authUser
    } catch (error: unknown) {
      let appError: AppError

      if (error instanceof ZodError) {
        appError = mapZodError(error)
      } else if (isAppError(error)) {
        appError = error
      } else {
        appError = mapUnknownError(error)
      }

      trackError(appError, 'auth.verifyMfa')
      throw appError
    }
  }

  public async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        const appError = mapSupabaseAuthError(error)
        throw appError
      }
    } catch (error: unknown) {
      let appError: AppError

      if (isAppError(error)) {
        appError = error
      } else {
        appError = mapUnknownError(error)
      }

      trackError(appError, 'auth.signOut')
      throw appError
    }
  }

  public async signUp(payload: SignUpPayload): Promise<void> {
    try {
      const parsed = signUpSchema.parse(payload);

      const { error } = await supabase.auth.signUp({
        email: parsed.email,
        password: parsed.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw mapSupabaseAuthError(error);
      }
    } catch (error: unknown) {
      const appError = this.handleError(error, 'auth.signUp');
      throw appError;
    }
  }

  public async signInWithGoogle(): Promise<void> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw mapSupabaseAuthError(error);
      }
    } catch (error: unknown) {
      const appError = this.handleError(error, 'auth.signInWithGoogle');
      throw appError;
    }
  }

  public async forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
    try {
      const parsed = forgotPasswordSchema.parse(payload);

      const { error } = await supabase.auth.resetPasswordForEmail(parsed.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        throw mapSupabaseAuthError(error);
      }
    } catch (error: unknown) {
      const appError = this.handleError(error, 'auth.forgotPassword');
      throw appError;
    }
  }

  public async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    try {
      const parsed = resetPasswordSchema.parse(payload);

      const { error } = await supabase.auth.updateUser({
        password: parsed.password,
      });

      if (error) {
        throw mapSupabaseAuthError(error);
      }
    } catch (error: unknown) {
      const appError = this.handleError(error, 'auth.resetPassword');
      throw appError;
    }
  }

  public async handleAuthCallback(): Promise<AuthUser | null> {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw mapSupabaseAuthError(error);
      }

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email ?? '',
        isAdmin: false,
      };
    } catch (error: unknown) {
      const appError = this.handleError(error, 'auth.handleAuthCallback');
      throw appError;
    }
  }

  private handleError(error: unknown, context: string): AppError {
    let appError: AppError;

    if (error instanceof ZodError) {
      appError = mapZodError(error);
    } else if (isAppError(error)) {
      appError = error;
    } else {
      appError = mapUnknownError(error);
    }

    trackError(appError, context);
    return appError;
  }
}

export const authService = new AuthService();
