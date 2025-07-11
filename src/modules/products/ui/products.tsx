import type { ApiErrorResponse } from '@kernel/api';
import type { Product, ProductWithFavorites } from '@kernel/types';
import { useGlobalScroll } from '@kernel/hooks';
import { ProductsGrid } from '@modules/products/ui/products-grid/products-grid';
import { Flex } from '@radix-ui/themes';
import { Pagination, Show } from '@shared/components';
import { useEffect } from 'react';

interface ProductsProps {
  products?: ProductWithFavorites[];
  error: ApiErrorResponse | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  pagination: {
    page: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  isPageChanging?: boolean;

  onClickCard: (product: Product) => void;
  onAddToBasket: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;

}

export function Products(props: ProductsProps) {
  const {
    products,
    isError,
    refetch,
    pagination,
    onPageChange,
    isPageChanging,
    isLoading,

    onClickCard,
    onAddToBasket,
    onAddToWishlist,
  } = props;
  const { scrollToTop } = useGlobalScroll();

  useEffect(() => {
    if (isError) refetch();
  }, [isError, refetch]);

  useEffect(() => {
    if (!isPageChanging && !isLoading) {
      scrollToTop();
    }
  }, [pagination.page, isPageChanging]);

  return (
    <>
      <ProductsGrid
        products={products}
        isShow={!isPageChanging && !isLoading}
        onClickCard={onClickCard}
        onAddToBasket={onAddToBasket}
        onAddToWishlist={onAddToWishlist}
      />

      <Show when={pagination.totalPages > 1}>
        <Flex justify="center" align="center" mt="4">
          <Pagination
            page={pagination.page}
            total={pagination.totalPages}
            onPageChange={onPageChange}
          />
        </Flex>
      </Show>
    </>
  );
}
