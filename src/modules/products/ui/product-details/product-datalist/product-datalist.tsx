import { Price } from '@kernel/components'
import type { Product } from '@kernel/types'
import { DataList } from '@radix-ui/themes'
import { StarRating } from '@shared/components'
import { HopBadge } from '@shared/components/ui/hop-badge'

export const ProductDatalist = ({ product }:{ product: Product }) => {
  return <DataList.Root mt="5">
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Category</DataList.Label>
            <DataList.Value>
              {product.categories.map(c =>
                <HopBadge key={c.id} text={c.name} size="small" />)}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Rating</DataList.Label>
            <DataList.Value>
              <StarRating
                currentRating={product.averageRating}
                readonly={true}
                showTooltip={false}
                showRatingText={true}
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
}
