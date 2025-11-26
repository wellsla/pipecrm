import { createAppError } from '../app/app.mapping'
import { treeifyError, type ZodError } from 'zod'

import type { AppError } from '../../types/error'

export const mapZodError = (error: ZodError): AppError => {
  const firstIssue = error.issues[0]

  return createAppError({
    code: 'VALIDATION_ERROR',
    origin: 'ZOD',
    message: firstIssue?.message ?? 'Dados inválidos.',
    details: { zod: treeifyError(error) },
    userFriendly: true,
  })
}
