import { createAppError } from '../app/app.mapping'

import type { AppError } from '../../types/error'

export const mapUnknownError = (error: unknown): AppError => {
  if (typeof error === 'string') {
    return createAppError({
      code: 'UNKNOWN',
      origin: 'UNKNOWN',
      message: error,
      details: { raw: error },
    })
  }

  if (error instanceof Error) {
    return createAppError({
      code: 'UNKNOWN',
      origin: 'UNKNOWN',
      message: error.message,
      details: {
        name: error.name,
        stack: error.stack,
      },
    })
  }

  return createAppError({
    code: 'UNKNOWN',
    origin: 'UNKNOWN',
    message: 'Ocorreu um erro inesperado.',
    details: { raw: error },
  })
}
