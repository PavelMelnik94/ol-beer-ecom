import type { Address, FavoriteProduct, Rating, User } from '@kernel/types';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface State {
  user: Omit<User, 'token'> | null;
  ratings: Rating[];
  favorites: FavoriteProduct[];
  addresses: Address[];
}

interface Actions {
  setRatings: (ratings: Rating[]) => void;
  setFavorites: (favorites: FavoriteProduct[]) => void;
  setAddresses: (addresses: Address[]) => void;
  setUser: (user: Omit<User, 'token'> | null) => void;

  hasRating: (productId: string) => Rating | undefined;
  hasFavorite: (productId: string) => boolean;
}

export const userStore = create<State & Actions>()(
  subscribeWithSelector((set, get) => ({
    user: null,
    ratings: [],
    favorites: [],
    addresses: [],

    setRatings: (ratings: Rating[]) => {
      set({
        ratings,
      });
    },
    setFavorites: (favorites: FavoriteProduct[]) => {
      set({
        favorites,
      });
    },
    setAddresses: (addresses: Address[]) => {
      set({
        addresses,
      });
    },
    setUser: (user: Omit<User, 'token'> | null) => {
      set({
        user,
      });
    },

    hasRating: (productId: string) => {
      return get().ratings.find(rating => rating.productId === productId);
    },
    hasFavorite: (productId: string) => {
      return get().favorites.some(favorite => favorite.productId === productId);
    },

  })),
);
export type UserStore = typeof userStore extends (infer T) ? T : never;

export function useUserStore() {
  return userStore(state => ({
    ratings: state.ratings,
    favorites: state.favorites,
    addresses: state.addresses,
    setRatings: state.setRatings,
    setFavorites: state.setFavorites,
    setAddresses: state.setAddresses,
    hasRating: state.hasRating,
    hasFavorite: state.hasFavorite,
  }));
}

export function useUserRatings() {
  return userStore(state => ({
    ratings: state.ratings,
    setRatings: state.setRatings,
    hasRating: state.hasRating,
  }));
}

export function useUserFavorites() {
  return userStore(state => ({
    favorites: state.favorites,
    setFavorites: state.setFavorites,
    hasFavorite: state.hasFavorite,
  }));
}

export function useUserAddresses() {
  return userStore(state => ({
    addresses: state.addresses,
    setAddresses: state.setAddresses,
  }));
}
