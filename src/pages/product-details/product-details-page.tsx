import { PromoCodeVelocity } from '@modules/cart';
import { ProductDetails, ProductDetailsSkeleton, useProductDetails } from '@modules/products';
import {  Box, Container } from '@radix-ui/themes';
import { Breadcrumbs } from '@shared/components';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string; }>();
  const { product, isLoading } = useProductDetails(id!);

  const breadcrumbs = useMemo(() => {
    const items = [
      { label: 'Showcase', to: '/showcase' },
      product?.brewery?.name && product?.brewery?.id
        ? { label: product.brewery.name, to: `/showcase?breweryId=${product.brewery.id}` }
        : null,
      product
        ? { label: product.title, to: `/products/${product.id}` }
        : null,
    ];
    return items.filter((item): item is { label: string; to: string } => Boolean(item && item.label));
  }, [product]);

  if (isLoading || !product) {
    return <Container pr="5" pl="5" pt="5" pb="5"><ProductDetailsSkeleton /></Container>;
  }

  return (
    <div>

      <Container pr="5" pl="5" pt="5" pb="5">
        <Breadcrumbs items={breadcrumbs} />
        <ProductDetails product={product} />
      </Container>
      <Box mt="5">
        <PromoCodeVelocity />
      </Box>
    </div>
  );
}
