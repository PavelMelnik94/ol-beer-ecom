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
  // URL состояние фильтров
  const [searchQuery, setSearchQuery] = useQueryState('search');
  const [categoryIdsQuery, setCategoryIdsQuery] = useQueryState('categoryIds');
  const [breweryIdQuery, setBreweryIdQuery] = useQueryState('breweryId');
  const [minPriceQuery, setMinPriceQuery] = useQueryState('minPrice');
  const [maxPriceQuery, setMaxPriceQuery] = useQueryState('maxPrice');
  const [sortByQuery, setSortByQuery] = useQueryState('sortBy');
  const [orderQuery, setOrderQuery] = useQueryState('order');

  // Собираем URL параметры
  const urlParams: FiltersUrl = useMemo(() => ({
    search: searchQuery || undefined,
    categoryIds: categoryIdsQuery ? categoryIdsQuery.split(',') : undefined,
    breweryId: breweryIdQuery || undefined,
    minPrice: minPriceQuery || undefined,
    maxPrice: maxPriceQuery || undefined,
    sortBy: sortByQuery || undefined,
    order: orderQuery || undefined,
  }), [searchQuery, categoryIdsQuery, breweryIdQuery, minPriceQuery, maxPriceQuery, sortByQuery, orderQuery]);

  // Конвертируем URL параметры в данные формы
  const formData = useMemo(() => productsModel.urlToForm(urlParams), [urlParams]);

  // Настройка react-hook-form
  const form = useForm<FiltersForm>({
    resolver: zodResolver(filtersFormSchema),
    defaultValues: formData,
    mode: 'onChange',
  });

  const { reset, watch, setValue } = form;

  // Throttled функция для обновления URL (только для поиска)
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
        setSortByQuery(urlData.sortBy || null),
        setOrderQuery(urlData.order || null),
      ]);
    }, 500),
    [
      setSearchQuery,
      setCategoryIdsQuery,
      setBreweryIdQuery,
      setMinPriceQuery,
      setMaxPriceQuery,
      setSortByQuery,
      setOrderQuery,
    ],
  );

  // Мгновенная функция для обновления URL (для всех полей кроме поиска)
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
      setSortByQuery(urlData.sortBy || null),
      setOrderQuery(urlData.order || null),
    ]);
  }, [
    setSearchQuery,
    setCategoryIdsQuery,
    setBreweryIdQuery,
    setMinPriceQuery,
    setMaxPriceQuery,
    setSortByQuery,
    setOrderQuery,
  ]);

  // Стабильная функция для вызова onFiltersChange
  const notifyFiltersChange = useCallback((data: FiltersForm) => {
    const apiParams = productsModel.formToApi(data);
    onFiltersChange?.(apiParams);
  }, [onFiltersChange]);

  // Сброс фильтров
  const resetFilters = useCallback(async () => {
    const emptyData: FiltersForm = {
      search: '',
      categoryIds: [],
      breweryId: '',
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: undefined,
      order: undefined,
    };

    reset(emptyData);
    await instantUpdateUrl(emptyData);
    notifyFiltersChange(emptyData);
  }, [reset, instantUpdateUrl, notifyFiltersChange]);

  // Получение текущих значений фильтров для API
  const getCurrentApiFilters = useCallback(() => {
    return productsModel.formToApi(watch());
  }, [watch]);

  // Вызываем onFiltersChange только один раз при инициализации
  useEffect(() => {
    notifyFiltersChange(formData);
  }, []); // Пустой массив зависимостей - вызывается только один раз

  return {
    form,
    setValue: (name: keyof FiltersForm, value: any) => {
      setValue(name, value);

      // Получаем текущие данные формы
      const currentData = { ...watch(), [name]: value };

      // Применяем фильтры
      if (name === 'search') {
        throttledUpdateUrl(currentData);
      }
      else {
        instantUpdateUrl(currentData);
      }

      // Вызываем callback для API
      notifyFiltersChange(currentData);
    },
    resetFilters,
    getCurrentApiFilters,
    isFiltersEmpty: Object.keys(getCurrentApiFilters()).length === 0,
  };
}
