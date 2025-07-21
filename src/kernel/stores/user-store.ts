import type { Address, FavoriteProduct, Rating, User } from '@kernel/types';
import { generateRandomId } from '@shared/utils';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface State {
  profile: User | undefined;
  ratings: Rating[];
  favorites: FavoriteProduct[];
  addresses: Address[];
}

interface Actions {
  setRatings: (ratings: Rating[]) => void;
  setFavorites: (favorites: FavoriteProduct[]) => void;
  setAddresses: (addresses: Address[]) => void;
  setProfile: (user: User | undefined) => void;

  hasRating: (productId: string) => Rating | undefined;
  hasFavorite: (productId: string) => boolean;

  optimisticAddRating: (productId: string, rating: number) => void;
  optimisticUpdateRating: (productId: string, rating: number) => void;
  optimisticRemoveRating: (productId: string) => void;
  optimisticToggleFavorite: (productId: string) => void;
}

export const useUserStore = create<State & Actions>()(
  subscribeWithSelector((set, get) => ({
    profile: undefined,
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
    setProfile: (profile: User | undefined) => {
      set({
        profile,
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
        id: generateRandomId(),
        productId,
        rating,
        userId: get().profile?.id || '',
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
          id: generateRandomId(),
          productId,
          userId: get().profile?.id || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          product: {
            id: generateRandomId(),
            title: generateRandomId(),
          },
        } as unknown as FavoriteProduct;
        set({ favorites: [...currentFavorites, newFavorite] });
      }
    },

  })),
);
