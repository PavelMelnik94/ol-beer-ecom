import { ProductDetails, useProductDetails } from '@modules/products';
import {  Container } from '@radix-ui/themes';
import { useParams } from 'react-router-dom';

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string; }>();

  const { product, isLoading } = useProductDetails(id!);

  if (isLoading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container pr="5" pl="5" pt="5" pb="5">
        <ProductDetails product={product} />
      </Container>
    </div>
  );
}
