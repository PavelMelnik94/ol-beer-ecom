import type { Product } from '@kernel/types';
import { useGoTo } from '@kernel/hooks';
import {
  Products,
  ProductsFilters,
  useFiltersData,
  useProductsFilters,
  useProductsPagination,
  useProductsPaginationState,
} from '@modules/products';
import { Box, Button, Container } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { FunnelX } from 'lucide-react';
import { useState } from 'react';
import { Hero } from './ui/hero';
import { ShowFiltersAction } from './ui/show-filters-action';

export function ProductsPage() {
  const { page: productPage, isPageChanging, handlePageChange } = useProductsPaginationState();

  const {
    form,
    setValue,
    resetFilters,
    getCurrentApiFilters,
    isFiltersEmpty,
  } = useProductsFilters({
    onFiltersChange: () => {
      handlePageChange(1);
    },
  });

  const { categories, breweries, isLoading: isFiltersLoading } = useFiltersData();

  const {
    products,
    pagination,
    isLoading,
    error,
    refetch,
  } = useProductsPagination({
    page: productPage,
    filterParams: getCurrentApiFilters(),
  });

  const { navigateToProductItem } = useGoTo();

  const [visibleFiltersPanel, setVisibleFiltersPanel] = useState<boolean>(false);

  const handleClickShowFilters = () => {
    setVisibleFiltersPanel(prev => !prev);
  };

  const handleClickHideFilters = () => {
    resetFilters();
    setVisibleFiltersPanel(false);
  };

  const handleClickOnCard = (product: Product) => {
    navigateToProductItem(product.id);
  };

  return (
    <>
      <Container>
        <Hero />
      </Container>

      <Show
        when={visibleFiltersPanel}
        fallback={<ShowFiltersAction toggleVisibility={handleClickShowFilters} />}
      >
        <Box pr="5" pl="5" pt="5">
          <ProductsFilters
            form={form}
            setValue={setValue}
            onReset={resetFilters}
            isLoading={isLoading || isFiltersLoading}
            isFiltersEmpty={isFiltersEmpty}
            categories={categories}
            breweries={breweries}
            actionSlot={(
              <Button
                variant="ghost"
                size="1"
                onClick={handleClickHideFilters}
              >
                <FunnelX size={14} />
                Hide filters
              </Button>
            )}
          />
        </Box>
      </Show>

      <Box pr="5" pl="5">
        <Products
          products={products}
          error={error}
          isLoading={isLoading}
          isError={!!error}
          refetch={refetch}
          pagination={pagination}
          onPageChange={handlePageChange}
          isPageChanging={isPageChanging}

          onClickCard={handleClickOnCard}
          onAddToWishlist={(product) => {
            // Handle adding product to wishlist
            console.log('Add to wishlist:', product);
          }}
          onAddToBasket={(product) => {
            // Handle adding product to basket
            console.log('Add to basket:', product);
          }}
        />
      </Box>

    </>
  );
}
