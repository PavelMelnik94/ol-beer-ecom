import type { Product, ProductWithFavorites } from '@kernel/types';
import { useGoTo } from '@kernel/hooks';
import { useUserStore } from '@kernel/stores';
import {
  Products,
  ProductsFilters,
  useFiltersData,
  useProductsFilters,
  useProductsPagination,
  useProductsPaginationState,
} from '@modules/products';
import { useToggleFavorite } from '@modules/user';
import { Box, Button, Container, Flex } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { FunnelX, MoveLeft } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from './ui/hero';
import { ShowFiltersAction } from './ui/show-filters-action';

export function ProductsPage() {
  const { mutateAsync: toggleFavorite } = useToggleFavorite();
  const { search } = useLocation();

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
  const { hasFavorite } = useUserStore();

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

  const { navigateToProductItem, navigateToShowcase } = useGoTo();

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

  const handleAddToWishlist = async (product: Product) => {
    await toggleFavorite({ productId: product.id });
  };

  const handleGoToStore = () => {
    resetFilters();
    navigateToShowcase();
  };

  const productsWithFavorites: ProductWithFavorites[] = products.map(product => ({
    ...product,
    isFavorite: hasFavorite(product.id) || false,
  }));

  return (
    <>
      <Container>
        <Hero />
      </Container>

      <Show
        when={visibleFiltersPanel}
        fallback={(
          <>
            <Flex justify={search.includes('breweryId') ? 'between' : 'end'} align="center" gap="4" mt="5" mb="2" mr="5" ml="5">
              <Show when={search.includes('breweryId')}>
                <Button
                  variant="ghost"
                  size="1"
                  onClick={handleGoToStore}
                >
                  <MoveLeft size={14} />
                  Store
                </Button>

              </Show>
              <ShowFiltersAction toggleVisibility={handleClickShowFilters} />
            </Flex>

          </>
        )}
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
          products={productsWithFavorites}
          error={error}
          isLoading={isLoading}
          isError={!!error}
          refetch={refetch}
          pagination={pagination}
          onPageChange={handlePageChange}
          isPageChanging={isPageChanging}

          onClickCard={handleClickOnCard}
          onAddToWishlist={product => handleAddToWishlist(product)}
          onAddToBasket={(product) => {
            throw new Error(`Not implemented: ${product}`);
          }}

        />
      </Box>

    </>
  );
}
