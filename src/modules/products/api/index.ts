import type { ApiErrorResponse, ApiSuccessResponse, ApiSuccessResponsePaginated } from '@kernel/api';
import type { Brewery, Category, Product } from '@kernel/types';
import { API_ENDPOINTS, apiClient } from '@kernel/api';

export type SuccessResponseFilterProducts = ApiSuccessResponsePaginated<Product>;
export type SuccessResponseBreweries = ApiSuccessResponse<Brewery[]>;
export type SuccessResponseCategories = ApiSuccessResponse<Category[]>;
export type ErrorResponse = ApiErrorResponse;

async function getProductsFiltered(
  filterQuery: string,
  page: number | string = 1,
  limit: number = 25,
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

async function getProductById(id: string): Promise<ApiSuccessResponse<Product>> {
  return apiClient.get(API_ENDPOINTS.products.detail(id));
}

async function getRelatedProducts(id: string): Promise<ApiSuccessResponse<Product[]>> {
  return apiClient.get(API_ENDPOINTS.products.related(id));
}

async function searchProducts(query: string): Promise<ApiSuccessResponse<Product[]>> {
  return apiClient.get(`${API_ENDPOINTS.products.search}?q=${encodeURIComponent(query)}`);
}

async function getDiscountedProducts(): Promise<ApiSuccessResponse<Product[]>> {
  return apiClient.get(API_ENDPOINTS.products.discounted);
}

async function getFeaturedProducts(): Promise<ApiSuccessResponse<Product[]>> {
  return apiClient.get(API_ENDPOINTS.products.featured);
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
} as const;
