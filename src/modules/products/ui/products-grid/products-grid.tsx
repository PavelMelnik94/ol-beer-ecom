import type { Product } from '@kernel/types';
import { ButtonWithRegisterPopup } from '@modules/common';
import { ProductCardSkeleton } from '@modules/products/ui/product-card/product-card-skeleton';
import { ProductCard } from '@modules/products/ui/product-card/products-card';
import { Button, Flex, Grid, Tooltip } from '@radix-ui/themes';
import { For, Pulse, Show } from '@shared/components';
import { Heart } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

interface Props {
  products?: Product[];
  isShow?: boolean;
  imageAsSlider?: boolean;

  onClickCard: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onAddToBasket?: (product: Product) => void;
}
export function ProductsGrid({
  products,
  isShow,
  imageAsSlider,

  onAddToBasket,
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
    <Grid columns={columns} gap="3" width="auto">
      <Show when={isShow}>
        <For each={products}>
          {product => (
            <ProductCard
              imageAsSlider={imageAsSlider}
              key={product.id}
              product={product}
              onClickCart={() => onClickCard(product)}
              cardActionSlot={(
                <Flex align="center" gap="2">
                  <Show when={typeof onAddToWishlist === 'function'}>
                    <ButtonWithRegisterPopup
                      size="1"
                      variant="soft"
                      style={{ padding: '6px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToWishlist?.(product);
                      }}
                    >
                      <Tooltip content="Add to Wishlist" side="top">
                        <Heart size={12} color="gray" />
                      </Tooltip>
                    </ButtonWithRegisterPopup>
                  </Show>

                  <Show when={typeof onAddToBasket === 'function'}>
                    <ButtonWithRegisterPopup
                      size="1"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToBasket?.(product);
                      }}
                    >
                      Add to Cart
                      {product.isDiscount && <Pulse size={8} />}
                    </ButtonWithRegisterPopup>
                  </Show>
                </Flex>
              )}
            />
          )}
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
