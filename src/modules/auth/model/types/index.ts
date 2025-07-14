import type { Address } from '@kernel/types';
import type { z } from 'zod';
import type { LoginSchema } from '../schema';

export type LoginFormValues = z.infer<typeof LoginSchema>;

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export interface SecurityInfo {
  password: string;
  confirmPassword: string;
}

export type RegisterBody = {
  addresses: Address[];
} & PersonalInfo & Omit<SecurityInfo, 'confirmPassword'>;
