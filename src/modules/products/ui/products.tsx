import type { ApiErrorResponse } from '@kernel/api';
import type { Product } from '@kernel/types';
import { Separator } from '@radix-ui/themes';
import { useLoadMore } from '@shared/hooks';
import {  useEffect } from 'react';

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
  const { products, isError, isLoading, refetch, hasNextPage, isFetching, fetchNextPage } = props;

  const loadMoreRef = useLoadMore(hasNextPage, isFetching, fetchNextPage);

  useEffect(() => {
    if (isError) refetch();
  }, [isError, refetch]);

  if (isLoading) {
    return (
      <div>
        <p>Загрузка продуктов...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        {products?.map(product => (
          <div key={product.id} className="product-item">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>
              Price: $
              {product.price}
            </p>
            <p>
              ABV:
              {product.ABV}
            </p>
            <p>
              Discount:
              {product.discount}
              %
            </p>
            <p>
              IBU:
              {product.IBU}
            </p>
            <p>
              Average Rating:
              {product.averageRating}
            </p>
            <p>
              Country:
              {product.country}
            </p>
            <p>
              Is Discount:
              {product.isDiscount ? 'Yes' : 'No'}
            </p>
            <p>
              Brewery:
              {product.brewery.name}
            </p>
            <p>
              Categories:
              {product.categories.map(cat => cat.name).join(', ')}
            </p>
            <Separator mb="4" />
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} style={{ height: '50px' }} />
    </div>
  );
}
