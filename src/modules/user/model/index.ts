import { z } from 'zod';

export const createAddressSchema = z.object({
  city: z.string().min(1, 'City is required').regex(/^[a-z\s',-]+$/i, 'Only latin letters, spaces, apostrophes, commas and dashes allowed'),
  country: z.string().min(1, 'Country is required').regex(/^[a-z\s',-]+$/i, 'Only latin letters, spaces, apostrophes, commas and dashes allowed'),
  streetName: z.string().min(1, 'Street name is required').regex(/^[a-z0-9\s',-]+$/i, 'Only latin letters, numbers, spaces, apostrophes, commas and dashes allowed'),
  zip: z.string().min(1, 'ZIP code is required').regex(/^\d+$/, 'Only numbers allowed'),
  type: z.enum(['billing', 'shipping']),
});

export type CreateAddressData = z.infer<typeof createAddressSchema>;

const updateAddressSchema = z.object({
  city: z.string().min(1, 'City is required').optional(),
  country: z.string().min(1, 'Country is required').optional(),
  streetName: z.string().min(1, 'Street name is required').optional(),
  zip: z.string().min(1, 'ZIP code is required').optional(),
  type: z.enum(['billing', 'shipping']).optional(),
});

export type UpdateAddressData = z.infer<typeof updateAddressSchema>;

const uploadAvatarSchema = z.object({
  avatar: z.instanceof(File, { message: 'Avatar file is required' }),
});

export type UploadAvatarData = z.infer<typeof uploadAvatarSchema>;

const toggleFavoriteSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
});

export type ToggleFavoriteData = z.infer<typeof toggleFavoriteSchema>;

function validateCreateAddress(data: unknown): CreateAddressData {
  return createAddressSchema.parse(data);
}

function validateUpdateAddress(data: unknown): UpdateAddressData {
  return updateAddressSchema.parse(data);
}

function validateUploadAvatar(data: unknown): UploadAvatarData {
  return uploadAvatarSchema.parse(data);
}

function validateToggleFavorite(data: unknown): ToggleFavoriteData {
  return toggleFavoriteSchema.parse(data);
}

export const userModel = {
  createAddressSchema,
  updateAddressSchema,
  uploadAvatarSchema,
  toggleFavoriteSchema,
  validateCreateAddress,
  validateUpdateAddress,
  validateUploadAvatar,
  validateToggleFavorite,
} as const;
