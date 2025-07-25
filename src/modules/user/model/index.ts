import type { BeerRank } from '@modules/user/types';
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

function getBeerRank(ordersCount = 0): BeerRank {
  const BEER_LEVELS = [
    { beersToFinish: 1, rank: 'Newbie' },
    { beersToFinish: 5, rank: 'Beer Enthusiast' },
    { beersToFinish: 15, rank: 'Beer Expert' },
    { beersToFinish: 25, rank: 'Beer Guru' },
    { beersToFinish: 50, rank: 'Beer Master' },
  ] as Array<{ beersToFinish: number; rank: string; }>;

  let currentLevel = BEER_LEVELS[0];
  let nextLevel: { beersToFinish: number; rank: string; } | undefined;

  for (let index = 0; index < BEER_LEVELS.length; index++) {
    if (ordersCount < BEER_LEVELS[index].beersToFinish) {
      currentLevel = index === 0 ? BEER_LEVELS[0] : BEER_LEVELS[index - 1];
      nextLevel = BEER_LEVELS[index];
      break;
    }
    if (index === BEER_LEVELS.length - 1) {
      currentLevel = BEER_LEVELS[index];
      nextLevel = undefined;
    }
  }

  const max = nextLevel ? nextLevel.beersToFinish : currentLevel.beersToFinish;
  const toNext = nextLevel ? nextLevel.beersToFinish - ordersCount : 0;

  return {
    rank: currentLevel.rank,
    current: ordersCount,
    toNext,
    nextRank: nextLevel?.rank,
    max,
  };
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
  getBeerRank,
} as const;
