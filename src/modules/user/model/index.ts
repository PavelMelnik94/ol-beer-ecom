import { z } from 'zod';

export const createAddressSchema = z.object({
  city: z.string().min(1, 'Город обязателен'),
  country: z.string().min(1, 'Страна обязательна'),
  streetName: z.string().min(1, 'Улица обязательна'),
  zip: z.string().min(1, 'Индекс обязателен'),
  type: z.enum(['billing', 'shipping'], {
    errorMap: () => ({ message: 'Тип должен быть billing или shipping' }),
  }),
});

export type CreateAddressData = z.infer<typeof createAddressSchema>;

const updateAddressSchema = z.object({
  city: z.string().min(1, 'Город обязателен').optional(),
  country: z.string().min(1, 'Страна обязательна').optional(),
  streetName: z.string().min(1, 'Улица обязательна').optional(),
  zip: z.string().min(1, 'Индекс обязателен').optional(),
  type: z.enum(['billing', 'shipping']).optional(),
});

export type UpdateAddressData = z.infer<typeof updateAddressSchema>;

const uploadAvatarSchema = z.object({
  avatar: z.instanceof(File, { message: 'Файл аватара обязателен' }),
});

export type UploadAvatarData = z.infer<typeof uploadAvatarSchema>;

const toggleFavoriteSchema = z.object({
  productId: z.string().min(1, 'ID продукта обязателен'),
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
