import type { FiltersForm } from '@modules/products/model';
import type { UseFormReturn } from 'react-hook-form';

import { Badge, Box, Button, Select, Text, TextField } from '@radix-ui/themes';
import { RotateCcw, Search, X } from 'lucide-react';

import styles from './products-filters.module.scss';

interface ProductsFiltersProps {
  form: UseFormReturn<FiltersForm>;
  setValue: (name: keyof FiltersForm, value: any) => void;
  onReset: () => void;
  categories?: Array<{ id: string; name: string; }>;
  breweries?: Array<{ id: string; name: string; }>;
  isLoading?: boolean;
  isFiltersEmpty?: boolean;
}

export function ProductsFilters({
  form,
  setValue,
  onReset,
  categories = [],
  breweries = [],
  isLoading = false,
  isFiltersEmpty = true,
}: ProductsFiltersProps) {
  const { register, watch, formState: { errors } } = form;
  const watchedValues = watch();

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = watchedValues.categoryIds || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    setValue('categoryIds', newCategories);
  };

  const handleCategoryRemove = (categoryId: string) => {
    const currentCategories = watchedValues.categoryIds || [];
    const newCategories = currentCategories.filter(id => id !== categoryId);
    setValue('categoryIds', newCategories);
  };

  return (
    <Box className={styles.filtersContainer}>
      <div className={styles.filtersForm}>
        {/* Секция фильтров */}
        <div className={styles.filtersSection}>
          <Text className={styles.sectionTitle}>Filters</Text>
          <div className={styles.filtersGrid}>
            {/* Поиск */}
            <div className={styles.filterGroup}>
              <Text className={styles.filterLabel}>Search</Text>
              <TextField.Root
                size="2"
                placeholder="Search products..."
                {...register('search')}
                className={styles.searchInput}
              >
                <TextField.Slot>
                  <Search size={16} />
                </TextField.Slot>
              </TextField.Root>
              {errors.search && (
                <Text size="1" color="red" className={styles.errorText}>
                  {errors.search.message}
                </Text>
              )}
            </div>

            {/* Категории - множественный выбор */}
            <div className={styles.filterGroup}>
              <Text className={styles.filterLabel}>Categories</Text>
              <Select.Root
                onValueChange={handleCategoryToggle}
              >
                <Select.Trigger placeholder="Select categories" />
                <Select.Content>
                  {categories.map(category => (
                    <Select.Item key={category.id} value={category.id}>
                      {category.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              {/* Выбранные категории */}
              {watchedValues.categoryIds && watchedValues.categoryIds.length > 0 && (
                <div className={styles.selectedCategories}>
                  {watchedValues.categoryIds.map((categoryId) => {
                    const category = categories.find(c => c.id === categoryId);
                    return category
                      ? (
                          <Badge key={categoryId} variant="soft" className={styles.categoryBadge}>
                            {category.name}
                            <Button
                              size="1"
                              variant="ghost"
                              onClick={() => handleCategoryRemove(categoryId)}
                              className={styles.removeBadgeButton}
                            >
                              <X size={12} />
                            </Button>
                          </Badge>
                        )
                      : null;
                  })}
                </div>
              )}
            </div>

            {/* Пивоварня */}
            <div className={styles.filterGroup}>
              <Text className={styles.filterLabel}>Brewery</Text>
              <Select.Root
                value={watchedValues.breweryId || undefined}
                onValueChange={(value) => {
                  setValue('breweryId', value || '');
                }}
              >
                <Select.Trigger placeholder="All breweries" />
                <Select.Content>
                  {breweries.map(brewery => (
                    <Select.Item key={brewery.id} value={brewery.id}>
                      {brewery.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>

            {/* Цена */}
            <div className={styles.filterGroup}>
              <Text className={styles.filterLabel}>Price range</Text>
              <div className={styles.priceGroup}>
                <TextField.Root
                  size="2"
                  type="number"
                  placeholder="Min price"
                  {...register('minPrice', {
                    setValueAs: value => value === '' ? undefined : Number(value),
                  })}
                />
                <TextField.Root
                  size="2"
                  type="number"
                  placeholder="Max price"
                  {...register('maxPrice', {
                    setValueAs: value => value === '' ? undefined : Number(value),
                  })}
                />
              </div>
              {(errors.minPrice || errors.maxPrice) && (
                <Text size="1" color="red" className={styles.errorText}>
                  {errors.minPrice?.message || errors.maxPrice?.message}
                </Text>
              )}
            </div>
          </div>
        </div>

        {/* Кнопка сброса */}
        <div className={styles.filtersActions}>
          <Button
            type="button"
            variant="outline"
            size="2"
            onClick={onReset}
            className={styles.resetButton}
            disabled={isLoading || isFiltersEmpty}
          >
            <RotateCcw size={16} />
            Reset Filters
          </Button>
        </div>
      </div>
    </Box>
  );
}
