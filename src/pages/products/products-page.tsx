import { Products, useProductsPagination, useProductsPaginationState } from '@modules/products';

export function ProductsPage() {
  const { page: productPage, isPageChanging, handlePageChange } = useProductsPaginationState();

  const {
    products,
    pagination,
    isLoading,
    error,
    refetch,
  } = useProductsPagination({
    page: productPage,
    filterParams: {},
  });

  return (
    <Products
      products={products}
      error={error}
      isLoading={isLoading}
      isError={!!error}
      refetch={refetch}
      pagination={pagination}
      onPageChange={handlePageChange}
      isPageChanging={isPageChanging}
    />
  );
}
