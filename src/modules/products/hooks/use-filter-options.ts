import { QUERY_KEYS } from '@kernel/query';
import { useQuery } from '@tanstack/react-query';

import { productsApi } from '../api';

export function useBreweriesForFilters() {
  return useQuery({
    queryKey: QUERY_KEYS.products.breweries(),
    queryFn: async () => {
      const response = await productsApi.getBreweries();
      return response.data;
    },
    select: data => data.map(brewery => ({
      id: brewery.id,
      name: brewery.name,
    })),
  });
}

export function useCategoriesForFilters() {
  return useQuery({
    queryKey: QUERY_KEYS.products.categories(),
    queryFn: async () => {
      const response = await productsApi.getCategories();
      return response.data;
    },
    select: data => data.map(category => ({
      id: category.id,
      name: category.name,
    })),
  });
}
