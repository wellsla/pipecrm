import { ref } from 'vue';
import type { AppError } from '@/types/error';

export interface UseFormStateOptions {
  onSuccess?: () => void;
  onError?: (error: AppError) => void;
}

export function useFormState(options: UseFormStateOptions = {}) {
  const loading = ref(false);
  const error = ref<AppError | null>(null);
  const success = ref(false);

  const execute = async <T>(
    action: () => Promise<T>,
  ): Promise<T | undefined> => {
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      const result = await action();
      success.value = true;
      options.onSuccess?.();
      return result;
    } catch (err) {
      error.value = err as AppError;
      options.onError?.(err as AppError);
      return undefined;
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    loading.value = false;
    error.value = null;
    success.value = false;
  };

  return {
    loading,
    error,
    success,
    execute,
    reset,
  };
}
