import {
  Products,
  ProductsFilters,
  useFiltersData,
  useProductsFilters,
  useProductsPagination,
  useProductsPaginationState,
} from '@modules/products';
import { Container } from '@radix-ui/themes';

export function ProductsPage() {
  const { page: productPage, isPageChanging, handlePageChange } = useProductsPaginationState();

  const {
    form,
    setValue,
    resetFilters,
    getCurrentApiFilters,
    isFiltersEmpty,
  } = useProductsFilters({
    onFiltersChange: () => {
      // При изменении фильтров сбрасываем на первую страницу
      handlePageChange(1);
    },
  });

  const { categories, breweries, isLoading: isFiltersLoading } = useFiltersData();

  const {
    products,
    pagination,
    isLoading,
    error,
    refetch,
  } = useProductsPagination({
    page: productPage,
    filterParams: getCurrentApiFilters(),
  });

  return (
    <>
      <ProductsFilters
        form={form}
        setValue={setValue}
        onReset={resetFilters}
        isLoading={isLoading || isFiltersLoading}
        isFiltersEmpty={isFiltersEmpty}
        categories={categories}
        breweries={breweries}
      />

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
    </>
  );
}
