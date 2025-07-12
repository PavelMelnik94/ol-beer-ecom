import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{6,}$/i;

export const AddressSchema = z.object({
city: z.string().min(1, 'City is required').regex(/^[A-Za-z\s'-]+$/, 'Only latin letters allowed'),
country: z.string().min(1, 'Country is required').regex(/^[A-Za-z\s'-]+$/, 'Only latin letters allowed'),
streetName: z.string().min(1, 'Street name is required').regex(/^[A-Za-z\s'-]+$/, 'Only latin letters allowed'),
zip: z.string().min(1, 'ZIP code is required').regex(/^[0-9]+$/, 'Only numbers allowed'),
  type: z.enum(['billing', 'shipping']),
  isPrimaryAddress: z.boolean().default(true),
});

export const personalInfoSchema = z.object({
  firstName: z.string()
    .min(3, 'First name must be at least 3 characters')
    .regex(/^[A-Za-z]+$/, 'Only latin letters allowed'),
  lastName: z.string()
    .min(3, 'Last name must be at least 3 characters')
    .regex(/^[A-Za-z]+$/, 'Only latin letters allowed'),
  email: z.string().email('Invalid email format'),
});

export const securitySchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password confirmation required'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const addressesSchema = z.object({
  addresses: z.array(AddressSchema)
    .min(1, 'Shipping address is required')
    .refine(
      addresses => addresses.some(addr => addr.type === 'shipping'),
      { message: 'You must provide at least one shipping address' },
    )
});

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
  .extend({ addresses: addressesSchema })
  .extend({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password confirmation required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
