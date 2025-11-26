import * as Sentry from '@sentry/vue'

import type { App } from 'vue'
import type { Extras } from '@sentry/core'
import type { AppError } from './app/error.types'

import { isAppError } from './app/error.mapping'

export const initSentry = (app: App): void => {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    tracesSampleRate: 1.0,
  })
}

export const trackError = (error: unknown, context?: string): void => {
  if (isAppError(error)) {
    const appError = error as AppError

    if (appError.userFriendly === true && appError.code === 'VALIDATION_ERROR') {
      return
    }

    const extras: Extras | undefined = appError.details

    Sentry.captureException(appError, {
      tags: {
        origin: appError.origin,
        code: appError.code,
        context: context,
      },
      extra: extras,
    })

    return
  }

  Sentry.captureException(error, {
    tags: {
      context: context,
      origin: 'UNKNOWN',
    },
  })
}
