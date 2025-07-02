import type { z } from 'zod';
import type { LoginSchema } from '../schema';

export interface LoginCredentials {
  email: string
  password: string
}

export type LoginFormValues = z.infer<typeof LoginSchema>;
