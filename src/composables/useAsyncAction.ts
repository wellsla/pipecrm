import { ref, type Ref } from 'vue'
import { isAppError } from '@/core/errors/app/error.mapping'
import { mapUnknownError } from '@/core/errors/unknown/error.mapping'
import { trackError } from '@/core/errors/error.tracking'

import type { AppError } from '@/core/errors/app/error.types'

interface UseAsyncActionResult<T> {
  loading: Ref<boolean>
  error: Ref<AppError | null>
  data: Ref<T | null>
  run: (...args: unknown[]) => Promise<void>
}

export const useAsyncAction = <T>(
  fn: (...args: unknown[]) => Promise<T>,
  context?: string,
): UseAsyncActionResult<T> => {
  const loading = ref(false)
  const error = ref<AppError | null>(null)
  const data: Ref<T | null> = ref(null)

  const run = async (...args: unknown[]): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const result = await fn(...args)
      data.value = result
    } catch (e: unknown) {
      let appError: AppError

      if (isAppError(e)) {
        appError = e
      } else {
        appError = mapUnknownError(e)
      }

      error.value = appError
      trackError(appError, context)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    data,
    run,
  }
}
