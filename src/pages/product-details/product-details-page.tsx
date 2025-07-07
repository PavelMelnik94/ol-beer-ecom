import { PromoCodeVelocity } from '@modules/cart';
import { ProductDetails, ProductDetailsSkeleton, useProductDetails } from '@modules/products';
import {  Box, Container } from '@radix-ui/themes';
import { useParams } from 'react-router-dom';

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string; }>();

  const { product, isLoading } = useProductDetails(id!);

  if (isLoading || !product) {
    return <Container pr="5" pl="5" pt="5" pb="5"><ProductDetailsSkeleton /></Container>;
  }

  return (
    <div>
      <Container pr="5" pl="5" pt="5" pb="5">
        <ProductDetails product={product} />
      </Container>
        <Box mt="5">
          <PromoCodeVelocity  />
      </Box>
    </div>
  );
}
