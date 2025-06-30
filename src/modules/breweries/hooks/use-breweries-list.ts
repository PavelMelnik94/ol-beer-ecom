import { API_ENDPOINTS, type ApiErrorResponse, type ApiSuccessResponsePaginated, apiClient, queryKeys } from '@kernel/index'
import { useQuery } from '@tanstack/react-query'
import type { BreweryPreview } from '../types';

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
