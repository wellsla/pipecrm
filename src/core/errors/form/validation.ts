import { createAppError } from '../app/error.mapping'
import type { AppError } from '../app/error.types'

export const validationError = (message: string, field?: string): AppError => {
  return createAppError({
    code: 'VALIDATION_ERROR',
    origin: 'CLIENT',
    message,
    details: field ? { field } : undefined,
    userFriendly: true,
  })
}

export const mergeErrors = (...errors: (AppError | null | undefined)[]): AppError[] => {
  return errors.filter(Boolean) as AppError[]
}
