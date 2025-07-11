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

export const AddressSchema = z.object({
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  streetName: z.string().min(1, 'Street name is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  type: z.enum(['billing', 'shipping']),
  isPrimaryAddress: z.boolean().default(true),
});

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  // User must provide at least one shipping address, billing is optional
  addresses: z
    .array(AddressSchema)
    .min(1, 'At least one shipping address is required')
    .refine(
      (addresses) => {
        const hasShipping = addresses.some(addr => addr.type === 'shipping');
        return hasShipping;
      },
      {
        message: 'You must provide at least one shipping address',
      },
    ),
});
