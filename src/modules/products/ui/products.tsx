import { useProductsInfinite } from '@modules/products/hooks/use-products';

export function Products() {
  const { isLoading, isError, error, products } = useProductsInfinite({ filterParams: {} });

  console.log('Products:', products);
  return (
    <div>
      <h1>Products</h1>
      <p>This is the products page.</p>
    </div>
  );
}
