import type { z } from 'zod';
import type { AddressSchema, LoginSchema, RegisterSchema } from '../schema';

export interface LoginCredentials {
  email: string;
  password: string;
}

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type AddressFormValues = z.infer<typeof AddressSchema>;
