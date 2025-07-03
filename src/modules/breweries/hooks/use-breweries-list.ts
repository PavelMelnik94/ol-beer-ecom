import { QUERY_KEYS } from '@kernel/index';
import { useQuery } from '@tanstack/react-query';
import { breweriesApi } from '../api';
import { breweriesModel } from '../model';

export function useBreweriesList() {
  const { data: response, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.breweries.all,
    queryFn: breweriesApi.getBreweriesList,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    breweriesList: breweriesModel.flattenBreweriesPages(response ? [response] : undefined),
    isLoading,
    error,
  };
}
