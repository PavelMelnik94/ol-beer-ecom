import type { ApiErrorResponse } from '@kernel/api';
import type { Product } from '@kernel/types';
import { ProductCard } from '@modules/products/ui/product-card/products-card';
import { Box, Container, Flex, Grid, Section } from '@radix-ui/themes';
import { For, Pagination, Show, SuccessAlert } from '@shared/components';
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
}

export function Products(props: ProductsProps) {
  const { products, isError, refetch, pagination, onPageChange, isPageChanging, isLoading } = props;

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

      <Show when={pagination.totalPages > 1}>
        {(isPageChanging || isLoading) && (
          <Box mb="4" style={{ textAlign: 'center' }}>
            <SuccessAlert>
              Loading page
            </SuccessAlert>
          </Box>
        )}
        <Flex justify="end" align="center" mt="4">
          <Pagination
            page={pagination.page}
            total={pagination.totalPages}
            onPageChange={onPageChange}
          />
        </Flex>
      </Show>
    </Section>
  );
}
