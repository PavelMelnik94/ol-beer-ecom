import type {
  FiltersForm,
  FiltersUrl,
} from '../model';

import { zodResolver } from '@hookform/resolvers/zod';
import { throttle } from 'lodash-es';
import { useQueryState } from 'nuqs';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import {
  filtersFormSchema,
  productsModel,
} from '../model';

interface UseProductsFiltersProps {
  onFiltersChange?: (filters: Record<string, any>) => void;
}

export function useProductsFilters({
  onFiltersChange,
}: UseProductsFiltersProps = {}) {
  const [searchQuery, setSearchQuery] = useQueryState('search');
  const [categoryIdsQuery, setCategoryIdsQuery] = useQueryState('categoryIds');
  const [breweryIdQuery, setBreweryIdQuery] = useQueryState('breweryId');
  const [minPriceQuery, setMinPriceQuery] = useQueryState('minPrice');
  const [maxPriceQuery, setMaxPriceQuery] = useQueryState('maxPrice');

  const urlParams: FiltersUrl = useMemo(() => ({
    search: searchQuery || undefined,
    categoryIds: categoryIdsQuery ? categoryIdsQuery.split(',') : undefined,
    breweryId: breweryIdQuery || undefined,
    minPrice: minPriceQuery || undefined,
    maxPrice: maxPriceQuery || undefined,
  }), [searchQuery, categoryIdsQuery, breweryIdQuery, minPriceQuery, maxPriceQuery]);

  const formData = useMemo(() => productsModel.urlToForm(urlParams), [urlParams]);

  const form = useForm<FiltersForm>({
    resolver: zodResolver(filtersFormSchema),
    defaultValues: formData,
    mode: 'onChange',
  });

  const { reset, watch, setValue } = form;

  const throttledUpdateUrl = useMemo(
    () => throttle(async (data: FiltersForm) => {
      const urlData = productsModel.formToUrl(data);

      await Promise.all([
        setSearchQuery(urlData.search || null),
        setCategoryIdsQuery(
          Array.isArray(urlData.categoryIds) && urlData.categoryIds.length > 0
            ? urlData.categoryIds.join(',')
            : null,
        ),
        setBreweryIdQuery(urlData.breweryId || null),
        setMinPriceQuery(urlData.minPrice || null),
        setMaxPriceQuery(urlData.maxPrice || null),
      ]);
    }, 500),
    [
      setSearchQuery,
      setCategoryIdsQuery,
      setBreweryIdQuery,
      setMinPriceQuery,
      setMaxPriceQuery,
    ],
  );

  const instantUpdateUrl = useCallback(async (data: FiltersForm) => {
    const urlData = productsModel.formToUrl(data);

    await Promise.all([
      setSearchQuery(urlData.search || null),
      setCategoryIdsQuery(
        Array.isArray(urlData.categoryIds) && urlData.categoryIds.length > 0
          ? urlData.categoryIds.join(',')
          : null,
      ),
      setBreweryIdQuery(urlData.breweryId || null),
      setMinPriceQuery(urlData.minPrice || null),
      setMaxPriceQuery(urlData.maxPrice || null),
    ]);
  }, [
    setSearchQuery,
    setCategoryIdsQuery,
    setBreweryIdQuery,
    setMinPriceQuery,
    setMaxPriceQuery,
  ]);

  const notifyFiltersChange = useCallback((data: FiltersForm) => {
    const apiParams = productsModel.formToApi(data);
    onFiltersChange?.(apiParams);
  }, [onFiltersChange]);

  const resetFilters = useCallback(async () => {
    const emptyData: FiltersForm = {
      search: '',
      categoryIds: [],
      breweryId: '',
      minPrice: undefined,
      maxPrice: undefined,
    };

    reset(emptyData);
    await instantUpdateUrl(emptyData);
    notifyFiltersChange(emptyData);
  }, [reset, instantUpdateUrl, notifyFiltersChange]);

  const getCurrentApiFilters = useCallback(() => {
    return productsModel.formToApi(watch());
  }, [watch]);

  useEffect(() => {
    notifyFiltersChange(formData);
  }, []);

  return {
    form,
    setValue: (name: keyof FiltersForm, value: any) => {
      setValue(name, value);

      const currentData = { ...watch(), [name]: value };

      if (name === 'search') {
        throttledUpdateUrl(currentData);
      }
      else {
        instantUpdateUrl(currentData);
      }

      notifyFiltersChange(currentData);
    },
    resetFilters,
    getCurrentApiFilters,
    isFiltersEmpty: Object.keys(getCurrentApiFilters()).length === 0,
  };
}
