import type {
  FiltersForm,
  FiltersUrl,
} from '../model';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryState } from 'nuqs';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import {
  filtersFormSchema,
  productsModel,
} from '../model';
import { throttle } from '@shared/utils';

interface UseProductsFiltersProperties {
  onFiltersChange?: (filters: Record<string, unknown>) => void;
}

export function useProductsFilters({
  onFiltersChange,
}: UseProductsFiltersProperties = {}) {
  const [searchQuery, setSearchQuery] = useQueryState('search');
  const [categoryIdsQuery, setCategoryIdsQuery] = useQueryState('categoryIds');
  const [breweryIdQuery, setBreweryIdQuery] = useQueryState('breweryId');
  const [minPriceQuery, setMinPriceQuery] = useQueryState('minPrice');
  const [maxPriceQuery, setMaxPriceQuery] = useQueryState('maxPrice');

  const urlParameters: FiltersUrl = useMemo(() => ({
    search: searchQuery || undefined,
    categoryIds: categoryIdsQuery ? categoryIdsQuery.split(',') : undefined,
    breweryId: breweryIdQuery || undefined,
    minPrice: minPriceQuery || undefined,
    maxPrice: maxPriceQuery || undefined,
  }), [searchQuery, categoryIdsQuery, breweryIdQuery, minPriceQuery, maxPriceQuery]);

  const formData = useMemo(() => productsModel.urlToForm(urlParameters), [urlParameters]);

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
    const apiParameters = productsModel.formToApi(data);
    onFiltersChange?.(apiParameters);
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
    const initialApiParameters = productsModel.formToApi(formData);
    if (Object.keys(initialApiParameters).length > 0) {
      notifyFiltersChange(formData);
    }
  }, []);

  return {
    form,
    setValue: (name: keyof FiltersForm, value: string | string[]) => {
      setValue(name, value);

      const currentData = { ...watch(), [name]: value };

      if (name === 'search') {
        throttledUpdateUrl(currentData);
      }
      else {
        void instantUpdateUrl(currentData);
      }

      notifyFiltersChange(currentData);
    },
    resetFilters,
    getCurrentApiFilters,
    isFiltersEmpty: Object.keys(getCurrentApiFilters()).length === 0,
  };
}
