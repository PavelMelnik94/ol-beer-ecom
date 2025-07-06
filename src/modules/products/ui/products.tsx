import type { ApiErrorResponse } from '@kernel/api';
import type { Product } from '@kernel/types';
import { ProductCard } from '@modules/products/ui/product-card/products-card';
import { Grid, Section } from '@radix-ui/themes';
import { For } from '@shared/components';
import { useLoadMore } from '@shared/hooks';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ProductsProps {
  products?: Product[];
  error: ApiErrorResponse | null;
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  refetch: () => void;
}

export function Products(props: ProductsProps) {
  const { products, isError, refetch, hasNextPage, isFetching, fetchNextPage } = props;

  const loadMoreRef = useLoadMore(hasNextPage, isFetching, fetchNextPage);

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

  return (
    <Section pb="0" pr="5" pl="5">
      <Grid columns={columns} gap="3" width="auto">
        <For each={products}>
          {product => (
            <ProductCard key={product.id} product={product} />
          )}
        </For>
      </Grid>

      <div ref={loadMoreRef} style={{ height: '50px' }} />
    </Section>
  );
}
