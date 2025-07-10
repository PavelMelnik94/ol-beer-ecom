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
  id: '9e496926-b6f0-489c-81ba-ee64fca93aa3';
  userId: '8cb880bd-23fc-41a8-aaaf-074efe02e7bd';
  productId: '90296caf-668a-4f47-8d42-a47a87fd4978';
  createdAt: '2025-07-10T18:43:44.421Z';
}
