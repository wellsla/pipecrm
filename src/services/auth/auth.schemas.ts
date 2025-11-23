import { z } from 'zod';

export const emailSchema = z.email({ message: 'E-mail inválido' }).min(1, { message: 'E-mail é obrigatório' });

export const passwordSchema = z
  .string()
  .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export const mfaCodeSchema = z
  .string()
  .length(6, { message: 'Código deve ter 6 dígitos' })
  .regex(/^\d{6}$/, { message: 'Código deve conter apenas números' });