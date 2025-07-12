import type { Address, FavoriteProduct, Rating, User } from '@kernel/types';
import { nanoid } from 'nanoid';
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

  optimisticAddRating: (productId: string, rating: number) => void;
  optimisticUpdateRating: (productId: string, rating: number) => void;
  optimisticRemoveRating: (productId: string) => void;
  optimisticToggleFavorite: (productId: string) => void;
}

export const useUserStore = create<State & Actions>()(
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

    optimisticAddRating: (productId: string, rating: number) => {
      const currentRatings = get().ratings;
      const newRating = {
        id: nanoid(),
        productId,
        rating,
        userId: get().user?.id || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Rating;
      set({ ratings: [...currentRatings, newRating] });
    },

    optimisticUpdateRating: (productId: string, rating: number) => {
      const currentRatings = get().ratings;
      const updatedRatings = currentRatings.map(r =>
        r.productId === productId
          ? { ...r, rating, updatedAt: new Date().toISOString() }
          : r,
      );
      set({ ratings: updatedRatings });
    },

    optimisticRemoveRating: (productId: string) => {
      const currentRatings = get().ratings;
      const filteredRatings = currentRatings.filter(r => r.productId !== productId);
      set({ ratings: filteredRatings });
    },

    optimisticToggleFavorite: (productId: string) => {
      const currentFavorites = get().favorites;
      const isFavorite = currentFavorites.some(f => f.productId === productId);

      if (isFavorite) {
        const filteredFavorites = currentFavorites.filter(f => f.productId !== productId);
        set({ favorites: filteredFavorites });
      }
      else {
        const newFavorite = {
          id: nanoid(),
          productId,
          userId: get().user?.id || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          product: {
            id: nanoid(),
            title: nanoid(),
          },
        } as unknown as FavoriteProduct;
        set({ favorites: [...currentFavorites, newFavorite] });
      }
    },

  })),
);
