import type { ApiErrorResponse, ApiSuccessResponsePaginated } from '@kernel/api';
import type { Product } from '@kernel/types';
import { API_ENDPOINTS, apiClient } from '@kernel/api';

export type SuccessResponseFilterProducts = ApiSuccessResponsePaginated<Product>;
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

export const productsApi = {
  getProductsFiltered,
} as const;
