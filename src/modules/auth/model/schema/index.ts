import { AddressSchema, passwordRegex, personalInfoSchema } from '@kernel/types';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  }).email('Invalid email address'),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
    .min(6, 'Password must be at least 6 characters long')
    .regex(passwordRegex, 'Password must contain at least one uppercase letter and one digit'),
});

export const RegisterSchema = personalInfoSchema
  .extend({
    addresses: z.array(AddressSchema).length(1, 'Exactly one shipping address is required'),
    password: z.string()
      .min(6, 'Password must be at least 6 characters long')
      .regex(passwordRegex, 'Password must contain at least one uppercase letter and one number'),
    confirmPassword: z.string()
      .min(6, 'Password confirmation required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
