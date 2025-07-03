import type { ApiErrorResponse, ApiSuccessResponsePaginated } from '@kernel/index';
import type { BreweryPreview } from '../types';
import { API_ENDPOINTS, apiClient } from '@kernel/index';

export type SuccessResponseBreweriesList = ApiSuccessResponsePaginated<BreweryPreview>;
export type ErrorResponse = ApiErrorResponse;

async function getBreweriesList(): Promise<SuccessResponseBreweriesList> {
  return apiClient.get(`${API_ENDPOINTS.breweries.all}`);
}

export const breweriesApi = {
  getBreweriesList,
} as const;
