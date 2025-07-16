import type {  ProductWithFavoritesAndRatings } from '@kernel/types';
import { Price } from '@kernel/components';
import { DataList } from '@radix-ui/themes';
import { For, StarRating } from '@shared/components';
import { HopBadge } from '@shared/components/ui/hop-badge';

export function ProductDatalist({
  product, onClickRating }: { product: ProductWithFavoritesAndRatings; onClickRating: (rating: number) => void; }) {
  return (
    <DataList.Root mt="5">
      <DataList.Item align="center">
        <DataList.Label minWidth="88px">Category</DataList.Label>
        <DataList.Value>
          <For each={product.categories}>
            {category => (
              <HopBadge key={category.name} text={category.name} size="small" />
            )}
          </For>

        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Rating</DataList.Label>
        <DataList.Value>
          <StarRating
            userRating={product.userRating === 0 ? undefined : product.userRating}
            currentRating={product.averageRating}
            showTooltip={true}
            showRatingText={true}
            onRatingClick={onClickRating}
            size={14}
          />
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">ABV</DataList.Label>
        <DataList.Value>
          {product.ABV}
          %
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">IBU</DataList.Label>
        <DataList.Value>
          {product.IBU}
        </DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label minWidth="88px">Price</DataList.Label>
        <DataList.Value>
          <Price price={product.price} discount={product.discount} />
        </DataList.Value>
      </DataList.Item>

    </DataList.Root>
  );
}
