import { Products, useProductsInfinite } from '@modules/products';
import { useQueryState } from 'nuqs';

export function ProductsPage() {
  const [page = 1, setPage] = useQueryState('page', {
    history: 'push',
    parse: Number,
    serialize: String,
  });
  const initialPage = page && page > 0 ? page : 1;

  const productsProps = useProductsInfinite({ filterParams: { page: initialPage } });

  const fetchNextPage = () => {
    setPage(initialPage + 1);
    if (productsProps.fetchNextPage) {
      productsProps.fetchNextPage();
    }
  };
  return <Products {...productsProps} fetchNextPage={fetchNextPage} />;
}
