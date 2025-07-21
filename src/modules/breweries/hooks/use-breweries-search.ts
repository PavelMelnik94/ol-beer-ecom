import { QUERY_KEYS } from '@kernel/index';
import { useOnClickOutside, useMediaQuery } from '@shared/hooks';
import { useQuery } from '@tanstack/react-query';

import { useMemo, useRef, useState } from 'react';
import { breweriesApi } from '../api';
import { breweriesModel } from '../model';

export function useBreweriesSearch() {
  const isEnabled = useMediaQuery('(min-width: 568px)');
  const [isActiveBrewerySearch, setIsActiveBrewerySearch] = useState<boolean>(false);
  const [isActiveLocationSearch, setIsActiveLocationSearch] = useState<boolean>(false);

  const breweryInputSearchReference = useRef(null);
  const locationInputSearchReference = useRef(null);

  const [search, setSearch] = useState<string>('');

  const { data: response, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.breweries.all,
    queryFn: breweriesApi.getBreweriesList,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const breweriesList = breweriesModel.flattenBreweriesPages(response ? [response] : undefined);

  useOnClickOutside(breweryInputSearchReference, () => {
    setIsActiveBrewerySearch(false);
    setSearch('');
  });
  useOnClickOutside(locationInputSearchReference, () => {
    setIsActiveLocationSearch(false);
    setSearch('');
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const breweries = useMemo(() => {
    if (!search || !isEnabled) return breweriesList;

    if (isActiveBrewerySearch) {
      return breweriesModel.filterByName(breweriesList, search);
    }

    if (isActiveLocationSearch) {
      return breweriesModel.filterByLocation(breweriesList, search);
    }
    return breweriesList;
  }, [search, breweriesList, isEnabled, isActiveBrewerySearch, isActiveLocationSearch]);

  const toggleBrewerySearch = () => {
    setIsActiveLocationSearch(false);
    setIsActiveBrewerySearch(true);
  };

  const toggleLocationSearch = () => {
    setIsActiveBrewerySearch(false);
    setIsActiveLocationSearch(true);
  };

  return {
    breweriesFiltered: breweries,
    showBreweriesInput: isActiveBrewerySearch && !isActiveLocationSearch,
    showLocationsInput: isActiveLocationSearch && !isActiveBrewerySearch,
    searchValue: search,
    isSearchLayout: isEnabled,
    refs: {
      location: locationInputSearchReference,
      brewery: breweryInputSearchReference,
    },
    isLoading,
    error,
    handleSearch,
    toggleBrewerySearch,
    toggleLocationSearch,
  };
}
