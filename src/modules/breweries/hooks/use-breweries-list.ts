import type { ApiErrorResponse, ApiSuccessResponsePaginated } from '@kernel/index';
import type { BreweryPreview } from '../types';
import { API_ENDPOINTS, apiClient, queryKeys } from '@kernel/index'
import { useQuery } from '@tanstack/react-query'

type SuccessResponse = ApiSuccessResponsePaginated<BreweryPreview>;
type ErrorResponse = ApiErrorResponse;

export function useBreweriesList() {
  const { data: response, error, isLoading } = useQuery<SuccessResponse, ErrorResponse>({
    queryKey: queryKeys.breweries.all,
    queryFn: () => apiClient.get(`${API_ENDPOINTS.breweries.all}`),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    breweriesList: response?.data,
    isLoading,
    error,
  }
}
