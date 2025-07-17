import { useBreweriesForFilters, useCategoriesForFilters } from './use-filter-options';

export function useFiltersData() {
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategoriesForFilters();

  const {
    data: breweries = [],
    isLoading: isBreweriesLoading,
    error: breweriesError,
  } = useBreweriesForFilters();

  return {
    categories,
    breweries,
    isLoading: isCategoriesLoading || isBreweriesLoading,
    error: categoriesError ?? breweriesError,
  };
}
