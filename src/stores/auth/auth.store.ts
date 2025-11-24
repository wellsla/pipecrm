import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { authService } from '@/services/auth/auth.service';
import { isAppError } from '@/core/errors/app/error.mapping';
import { mapUnknownError } from '@/core/errors/unknown/error.mapping';

import type { AuthUser } from '@/services/auth/auth.types';
import type { AppError } from '@/core/errors/app/error.types';

export const useAuthStore = defineStore('auth', () => {
  // states
  const user = ref<AuthUser | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<AppError | null>(null);
  const requiresMfa = ref<boolean>(false);

  // getters
  const isAuthenticated = computed<boolean>(() => user.value !== null);
  const errorMessage = computed<string | null>(() => error.value?.message ?? null);

  // actions
  const clearError = (): void => {
    error.value = null;
  };

  const setUser = (authUser: AuthUser | null): void => {
    user.value = authUser;
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const authUser = await authService.signIn({ email, password });
      user.value = authUser;
      requiresMfa.value = false;
    } catch (err: unknown) {
      error.value = isAppError(err) ? err : mapUnknownError(err);
      user.value = null;
    } finally {
      loading.value = false;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      await authService.signUp({ email, password, confirmPassword });
    } catch (err: unknown) {
      error.value = isAppError(err) ? err : mapUnknownError(err);
    } finally {
      loading.value = false;
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      await authService.signInWithGoogle();
    } catch (err: unknown) {
      error.value = isAppError(err) ? err : mapUnknownError(err);
    } finally {
      loading.value = false;
    }
  };

  const verifyMfa = async (code: string): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const authUser = await authService.verifyMfa(code);
      user.value = authUser;
      requiresMfa.value = false;
    } catch (err: unknown) {
      error.value = isAppError(err) ? err : mapUnknownError(err);
    } finally {
      loading.value = false;
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      await authService.forgotPassword({ email });
    } catch (err: unknown) {
      error.value = isAppError(err) ? err : mapUnknownError(err);
    } finally {
      loading.value = false;
    }
  };

  const resetPassword = async (
    password: string,
    confirmPassword: string,
  ): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      await authService.resetPassword({ password, confirmPassword });
    } catch (err: unknown) {
      error.value = isAppError(err) ? err : mapUnknownError(err);
    } finally {
      loading.value = false;
    }
  };

  const handleAuthCallback = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const authUser = await authService.handleAuthCallback();
      user.value = authUser;
    } catch (err: unknown) {
      error.value = isAppError(err) ? err : mapUnknownError(err);
    } finally {
      loading.value = false;
    }
  };

  const signOut = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      await authService.signOut();
      user.value = null;
      requiresMfa.value = false;
    } catch (err: unknown) {
      error.value = isAppError(err) ? err : mapUnknownError(err);
    } finally {
      loading.value = false;
    }
  };

  const initializeSession = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const authUser = await authService.initializeSession();
      user.value = authUser;
    } catch (err: unknown) {
      error.value = isAppError(err) ? err : mapUnknownError(err);
      user.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    // state
    user,
    loading,
    error,
    requiresMfa,

    // getters
    isAuthenticated,
    errorMessage,

    // actions
    clearError,
    setUser,
    signIn,
    signUp,
    signInWithGoogle,
    verifyMfa,
    forgotPassword,
    resetPassword,
    handleAuthCallback,
    signOut,
    initializeSession,
  };
});
