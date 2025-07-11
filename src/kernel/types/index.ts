export interface Address {
  id: string;
  city: string;
  country: string;
  streetName: string;
  zip: string;
  type: 'billing' | 'shipping';
  isPrimaryAddress: boolean;
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
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
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
}
