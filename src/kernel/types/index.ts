import z from 'zod';

export interface Address {
  id: string;
  city: string;
  country: string;
  streetName: string;
  zip: string;
  type: 'billing' | 'shipping';
}

interface Order {
  id: string;
  userId: string;
  total: number | null;
  discountedTotal: number | null;
  promoCode: number | null;
  status: string;
  userSnapshot: {
    id: string;
    email: string;
    avatar: string | null;
    lastName: string;
    firstName: string;
  };
  billingAddress: Address | null;
  shippingAddress: Address | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;

  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;

  addresses: Address[] | [];
  likedPostIds: string[] | [];
  likedCommentIds: string[] | [];

  token: string;
  createdAt: string;
  updatedAt: string;

  likedPostsCount: number;
  likedCommentsCount: number;
  ordersCount: number;

  orders: Order[] | [];
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export interface LikeResponse {
  liked: boolean;
  like: {
    id: string;
    userId: string;
    createdAt: string;
  };
}

export interface Brewery {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  location: string;
  website: string | null;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  ABV: number;
  IBU: number;
  country: string;
  isDiscount: boolean;
  images: string[];
  categories: Category[];
  brewery: Brewery;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithFavorites extends Product {
  isFavorite: boolean;
}

export interface ProductWithFavoritesAndRatings extends ProductWithFavorites {
  userRating: number;
}

export interface PromoCode {
  code: string;
  discount: string;
  description: string;
}

export interface Rating {

  createdAt: string;
  id: string;
  productId: string;
  rating: number;
  updatedAt: string;
  userId: string;
}

export interface FavoriteProduct {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: Product;
}

export const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
export const AddressSchema = z.object({
  city: z.string().min(1, 'City is required').regex(/^[a-z\s',-]+$/i, 'Only latin letters, spaces, apostrophes, commas and dashes allowed'),
  country: z.string().min(1, 'Country is required').regex(/^[a-z\s',-]+$/i, 'Only latin letters, spaces, apostrophes, commas and dashes allowed'),
  streetName: z.string().min(1, 'Street name is required').regex(/^[a-z0-9\s',-]+$/i, 'Only latin letters, numbers, spaces, apostrophes, commas and dashes allowed'),
  zip: z.string().min(1, 'ZIP code is required').regex(/^\d+$/, 'Only numbers allowed'),
  type: z.enum(['billing', 'shipping']),
  id: z.string(),
  isPrimaryAddress: z.boolean().optional(),
});

export const personalInfoSchema = z.object({
  firstName: z.string()
    .min(3, 'First name must be at least 3 characters')
    .regex(/^[a-z]+$/i, 'Only latin letters allowed'),
  lastName: z.string()
    .min(3, 'Last name must be at least 3 characters')
    .regex(/^[a-z]+$/i, 'Only latin letters allowed'),
  email: z.string().email('Invalid email format'),
  avatar: z.string().url('Invalid avatar URL').optional(),
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

export const changePasswordSchema = z.object({
  currentPassword: z.string()
    .min(6, 'Current password is required')
    .regex(passwordRegex, 'Current password must contain at least one uppercase letter and one number'),
  newPassword: z.string()
    .min(6, 'New password must be at least 6 characters long')
    .regex(passwordRegex, 'New password must contain at least one uppercase letter and one number'),
  confirmPassword: z.string()
    .min(6, 'Password confirmation required'),
}).refine(data => data.newPassword === data.confirmPassword, {
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
