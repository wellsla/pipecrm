import type { Extras } from '@sentry/core'

export type AppErrorCode = 'VALIDATION_ERROR'
  | 'AUTH_ERROR'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | 'NOT_FOUND'
  | 'FORBIDDEN'
  | 'CONFIG_ERROR'
  | 'UNKNOWN'

export type AppErrorOrigin =
  | 'ZOD'
  | 'SUPABASE'
  | 'HTTP'
  | 'SERVICE'
  | 'STORE'
  | 'UI'
  | 'ENVIRONMENT'
  | 'UNKNOWN'

export interface AppError {
  code: AppErrorCode
  message: string
  origin: AppErrorOrigin
  details?: Extras
  userFriendly?: boolean
}