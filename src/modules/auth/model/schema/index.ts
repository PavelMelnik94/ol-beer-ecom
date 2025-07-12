import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // Минимум 6 символов, хотя бы одна заглавная буква и одна цифра

export const AddressSchema = z.object({
  city: z.string().min(1, 'City is required').regex(/^[a-z\s',-]+$/i, 'Only latin letters, spaces, apostrophes, commas and dashes allowed'),
  country: z.string().min(1, 'Country is required').regex(/^[a-z\s',-]+$/i, 'Only latin letters, spaces, apostrophes, commas and dashes allowed'),
  streetName: z.string().min(1, 'Street name is required').regex(/^[a-z0-9\s',-]+$/i, 'Only latin letters, numbers, spaces, apostrophes, commas and dashes allowed'),
  zip: z.string().min(1, 'ZIP code is required').regex(/^\d+$/, 'Only numbers allowed'),
  type: z.enum(['billing', 'shipping']),
  id: z.string(),
  isPrimaryAddress: z.boolean(),
});

export const personalInfoSchema = z.object({
  firstName: z.string()
    .min(3, 'First name must be at least 3 characters')
    .regex(/^[a-z]+$/i, 'Only latin letters allowed'),
  lastName: z.string()
    .min(3, 'Last name must be at least 3 characters')
    .regex(/^[a-z]+$/i, 'Only latin letters allowed'),
  email: z.string().email('Invalid email format'),
});

export const securitySchema = z.object({
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(passwordRegex, 'Password must contain at least one uppercase letter and one number'),
  confirmPassword: z.string()
    .min(6, 'Password confirmation required'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const addressesSchema = z.object({
  addresses: z.array(AddressSchema)
    .length(1, 'Exactly one shipping address is required')
    .refine(
      (addresses) => {
        const shipping = addresses[0];
        return shipping && shipping.type === 'shipping';
      },
      { message: 'Address must be a shipping address' },
    ),
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
