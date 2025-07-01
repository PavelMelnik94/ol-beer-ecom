import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{6,}$/i;

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
