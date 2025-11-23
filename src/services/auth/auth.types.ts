import { z } from 'zod';
import {
  signInSchema,
  signUpSchema,
  mfaCodeSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './auth.schemas';

export type SignInPayload = z.infer<typeof signInSchema>;
export type SignUpPayload = z.infer<typeof signUpSchema>;
export type MfaCodePayload = z.infer<typeof mfaCodeSchema>;
export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;

export interface AuthUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface MfaChallenge {
  factorId: string;
  mfaRequired: boolean;
}