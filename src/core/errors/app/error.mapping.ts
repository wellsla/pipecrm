import type { AppError } from './error.types';

export const createAppError = (input: AppError): AppError => input;

export const isAppError = (error: unknown): error is AppError => {
  if (typeof error !== 'object' || error === null) return false;

  const candidate = error as Partial<AppError>;
  return (
    typeof candidate.code === 'string' &&
    typeof candidate.message === 'string' &&
    typeof candidate.origin === 'string'
  );
}