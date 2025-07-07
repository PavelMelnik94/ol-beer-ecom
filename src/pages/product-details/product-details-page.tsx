import { PromoCodeVelocity } from '@modules/cart';
import { ProductDetails, useProductDetails } from '@modules/products';
import { Box, Container } from '@radix-ui/themes';
import { useParams } from 'react-router-dom';

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string; }>();

  const { product, isLoading } = useProductDetails(id!);

  if (isLoading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Product Details for ID:
      {id}

      <Container pr="5" pl="5">
        <ProductDetails product={product} />
      </Container>
    </div>
  );
}
