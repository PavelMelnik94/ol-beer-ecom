import type { ApiErrorResponse, ApiSuccessResponsePaginated, Brewery } from '@kernel/index';
import { API_ENDPOINTS, apiClient } from '@kernel/index';

export type SuccessResponseBreweriesList = ApiSuccessResponsePaginated<Brewery>;
export type ErrorResponse = ApiErrorResponse;

async function getBreweriesList(): Promise<SuccessResponseBreweriesList> {
  return apiClient.get(`${API_ENDPOINTS.breweries.all}`);
}

export const breweriesApi = {
  getBreweriesList,
} as const;
