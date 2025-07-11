import type { ApiErrorResponse, ApiSuccessResponse, ApiSuccessResponsePaginated } from '@kernel/api';
import type { Brewery, Category, Product, Rating } from '@kernel/types';
import { API_ENDPOINTS, apiClient } from '@kernel/api';

export type SuccessResponse<T> = ApiSuccessResponse<T>;
export type SuccessResponseRate = ApiSuccessResponse<Rating>;
export type SuccessResponseFilterProducts = ApiSuccessResponsePaginated<Product>;
export type SuccessResponseProductDetails = ApiSuccessResponse<Product>;
export type SuccessResponseProducts = ApiSuccessResponse<Product[]>;
export type SuccessResponseBreweries = ApiSuccessResponse<Brewery[]>;
export type SuccessResponseCategories = ApiSuccessResponse<Category[]>;
export type ErrorResponse = ApiErrorResponse;

async function getProductsFiltered(
  filterQuery: string,
  page: number | string = 1,
  limit: number = 16,
): Promise<SuccessResponseFilterProducts> {
  if (!filterQuery) return apiClient.get(`${API_ENDPOINTS.products.all}?page=${page}&limit=${limit}`);

  const url = `${API_ENDPOINTS.products.all}?page=${page}&${filterQuery}&limit=${limit}`;
  return apiClient.get(url);
}

async function getBreweries(): Promise<SuccessResponseBreweries> {
  return apiClient.get(API_ENDPOINTS.products.breweries);
}

async function getCategories(): Promise<SuccessResponseCategories> {
  return apiClient.get(API_ENDPOINTS.products.categories);
}

async function getProductById(id: string): Promise<SuccessResponseProductDetails> {
  return apiClient.get(API_ENDPOINTS.products.detail(id));
}

async function getRelatedProducts(id: string, limit?: number): Promise<SuccessResponseProducts> {
  return apiClient.get(API_ENDPOINTS.products.related(id, limit));
}

async function searchProducts(query: string): Promise<SuccessResponseProducts> {
  return apiClient.get(`${API_ENDPOINTS.products.search}?q=${encodeURIComponent(query)}`);
}

async function getDiscountedProducts(): Promise<SuccessResponseProducts> {
  return apiClient.get(API_ENDPOINTS.products.discounted);
}

async function getFeaturedProducts(limit?: number): Promise<SuccessResponseProducts> {
  return apiClient.get(`${API_ENDPOINTS.products.featured}?limit=${limit}`);
}

async function rateProduct(productId: string, rating: number): Promise<SuccessResponseRate> {
  return apiClient.post(API_ENDPOINTS.products.rate, { productId, rating });
}

export const productsApi = {
  getProductsFiltered,
  getBreweries,
  getCategories,
  getProductById,
  getRelatedProducts,
  searchProducts,
  getDiscountedProducts,
  getFeaturedProducts,
  rateProduct,
} as const;
