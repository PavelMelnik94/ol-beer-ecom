import type { Product, ProductWithFavorites } from '@kernel/types';
import { AddToCartButton, ButtonWithAuthPopup } from '@modules/common';
import { ProductCardSkeleton } from '@modules/products/ui/product-card/product-card-skeleton';
import { ProductCard } from '@modules/products/ui/product-card/products-card';
import { Flex, Grid, Tooltip } from '@radix-ui/themes';
import { For, Show } from '@shared/components';
import { Bookmark } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

function isProductWithFavorites(product: Product | ProductWithFavorites): product is ProductWithFavorites {
  return 'isFavorite' in product;
}

interface Props {
  products?: ProductWithFavorites[] | Product[] | [];
  isShow?: boolean;
  imageAsSlider?: boolean;
  columnsCount?: string;

  onClickCard: (product: ProductWithFavorites | Product) => void;
  onAddToWishlist?: (product: ProductWithFavorites | Product) => void;
}
export function ProductsGrid({
  products,
  isShow = true,
  imageAsSlider,

  columnsCount,
  onAddToWishlist,
  onClickCard,
}: Props) {
  const largeScreen = useMediaQuery({
    query: '(min-width: 1000px) and (max-width: 1400px)',
  });

  const mediumScreen = useMediaQuery({
    query: '(min-width: 600px) and (max-width: 999px)',
  });

  const smallScreen = useMediaQuery({
    query: '(max-width: 599px)',
  });

  const columns = (() => {
    if (largeScreen) return '3';
    if (mediumScreen) return '2';
    if (smallScreen) return '1';
    return '4';
  })();

  const skeletons = Array.from({ length: Number.parseInt(columns, 10) * 2 }, (_, index) => (
    <ProductCardSkeleton key={`skeleton-${index}`} />
  ));

  return (
    <Grid columns={columnsCount ?? columns} gap="3" width="auto">
      <Show when={isShow}>
        <For each={products}>
          {(product) => {
            const hasWishlistData = isProductWithFavorites(product);
            const isFavorite = hasWishlistData && product.isFavorite;

            return (
              <ProductCard
                imageAsSlider={imageAsSlider}
                key={product.id}
                product={product}
                onClickCart={() => { onClickCard(product); }}
                cardActionSlot={(
                  <Flex align="center" gap="2">
                    <Show when={typeof onAddToWishlist === 'function'}>
                      <ButtonWithAuthPopup
                        size="1"
                        variant="soft"
                        color={isFavorite ? 'red' : 'gray'}
                        style={{ padding: '6px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToWishlist?.(product);
                        }}
                      >
                        <Tooltip content={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'} side="top">
                          <Bookmark
                            size={12}
                            fill={isFavorite ? 'red' : 'transparent'}
                            color={isFavorite ? 'red' : 'gray'}
                          />
                        </Tooltip>
                      </ButtonWithAuthPopup>
                    </Show>

                    <AddToCartButton product={product} />
                  </Flex>
                )}
              />
            );
          }}
        </For>
      </Show>

      <Show when={!isShow}>
        <For each={skeletons}>
          {skeleton => skeleton}
        </For>
      </Show>
    </Grid>
  );
}
