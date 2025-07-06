import type { ApiErrorResponse } from '@kernel/api';
import type { Product } from '@kernel/types';
import { useGlobalScroll } from '@kernel/hooks';
import { ProductCardSkeleton } from '@modules/products/ui/product-card/product-card-skeleton';
import { ProductCard } from '@modules/products/ui/product-card/products-card';
import { Button, Flex, Grid } from '@radix-ui/themes';
import { For, Pagination, Pulse, Show } from '@shared/components';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ProductsProps {
  products?: Product[];
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

  onClickCart: () => void;
  onAddToBasket: (product: Product) => void;

}

export function Products(props: ProductsProps) {
  const { products, isError, refetch, pagination, onPageChange, isPageChanging, isLoading, onClickCart, onAddToBasket } = props;
  const { scrollToTop } = useGlobalScroll();

  const largeScreen = useMediaQuery({
    query: '(min-width: 1000px) and (max-width: 1400px)',
  });

  const mediumScreen = useMediaQuery({
    query: '(min-width: 600px) and (max-width: 999px)',
  });

  const smallScreen = useMediaQuery({
    query: '(max-width: 599px)',
  });

  const columns = (() => {
    if (largeScreen) return '3';
    if (mediumScreen) return '2';
    if (smallScreen) return '1';
    return '4';
  })();

  useEffect(() => {
    if (isError) refetch();
  }, [isError, refetch]);

  useEffect(() => {
    if (!isPageChanging && !isLoading) {
      scrollToTop();
    }
  }, [pagination.page, isPageChanging]);

  const skeletons = Array.from({ length: Number.parseInt(columns, 10) * 2 }, (_, index) => (
    <ProductCardSkeleton key={`skeleton-${index}`} />
  ));

  return (
    <>
      <Grid columns={columns} gap="3" width="auto">
        <Show when={!isPageChanging && !isLoading}>
          <For each={products}>
            {product => (
              <ProductCard
                key={product.id}
                product={product}
                onClickCart={onClickCart}
                cardActionSlot={(
                  <Button
                    size="1"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToBasket?.(product);
                    }}
                  >
                    Add to Cart
                    {product.isDiscount && <Pulse size={8} />}
                  </Button>
                )}
              />
            )}
          </For>
        </Show>

        <Show when={isPageChanging || isLoading}>
          <For each={skeletons}>
            {skeleton => skeleton}
          </For>
        </Show>
      </Grid>

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
