import type { Product } from '@kernel/types';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface ProductsState {
  products: Product[];
  pagination: {
    page: number;
    totalPages: number;
  };
  isLoading: boolean;
}

interface ProductState {
  productsState: ProductsState;
}

interface ProductActions {
  setProducts: (products: Product[]) => void;
  setPagination: (pagination: { page: number; totalPages: number; }) => void;
  setProductsLoading: (isLoading: boolean) => void;
  resetProductsState: () => void;
}

const initialProductsState: ProductsState = {
  products: [],
  pagination: { page: 1, totalPages: 1 },
  isLoading: false,
};

export const useProductsStore = create<ProductState & ProductActions>()(
  subscribeWithSelector(set => ({
    productsState: initialProductsState,

    setProducts: (products: Product[]) =>
      set(state => ({
        productsState: {
          ...state.productsState,
          products,
        },
      })),

    setPagination: (pagination: { page: number; totalPages: number; }) =>
      set(state => ({
        productsState: {
          ...state.productsState,
          pagination,
        },
      })),

    setProductsLoading: (isLoading: boolean) =>
      set(state => ({
        productsState: {
          ...state.productsState,
          isLoading,
        },
      })),

    resetProductsState: () =>
      set({ productsState: initialProductsState }),
  })),
);
