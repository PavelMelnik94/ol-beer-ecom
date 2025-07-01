import type { User } from '@kernel/types';
import type { z } from 'zod';
import type { LoginSchema } from '../schema';

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuth: boolean
}

export type LoginFormValues = z.infer<typeof LoginSchema>;
