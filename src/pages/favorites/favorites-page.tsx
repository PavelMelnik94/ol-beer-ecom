import type { FavoriteProduct, Product, ProductWithFavorites } from '@kernel/types';
import { NoData } from '@kernel/components';
import { useGoTo } from '@kernel/hooks';
import { useUserStore } from '@kernel/stores';

import { useCartItem } from '@modules/cart';
import { ButtonWithAuthPopup } from '@modules/common';
import { ProductCard, ProductCardSkeleton } from '@modules/products';
import { useToggleFavorite, useUserFavorites } from '@modules/user';
import { Button, Container, Flex, Tooltip } from '@radix-ui/themes';
import { For, Pulse, Show } from '@shared/components';
import { Heart } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import styles from './favorites-page.module.scss';
import { Hero } from './ui/hero';

export function FavoritesPage() {
  const cartItem = useCartItem();
  const isCentered = useMediaQuery({
    query: '(max-width: 1200px)',
  });
  const { isLoading } = useUserFavorites({ enabled: true });
  const { mutateAsync: toggleFavorite } = useToggleFavorite();

  const favoritesProducts = useUserStore(s => s.favorites);

  const products: ProductWithFavorites[] = favoritesProducts.map((product: FavoriteProduct) => {
    return {
      ...product.product,
      isFavorite: true,
    };
  });

  const { navigateToProductItem, navigateToShowcase } = useGoTo();

  const handleClickOnCard = (product: Product) => {
    navigateToProductItem(product.id);
  };

  const handleToggleWishlist = async (product: Product) => {
    await toggleFavorite({ productId: product.id });
  };

  const skeletons = Array.from({ length: Number.parseInt('2', 10) * 2 }, (_, index) => (
    <ProductCardSkeleton key={`skeleton-${index}`} />
  ));

  if (products.length === 0 && !isLoading) {
    return (
      <Flex direction="column" align="center" justify="center" flexGrow="1">
        <Container pr="5" pl="5">
          <NoData
            mt="9"
            actionSlot={
              <Button size="2" onClick={navigateToShowcase}>Go store</Button>
            }
          />
        </Container>
      </Flex>

    );
  }
  const handleAddToCart = async (product: Product) => {
    cartItem.addItem({ productId: product.id, quantity: 1 });
  };

  return (
    <>

      <Container pr="5" pl="5" mb="8">
        <Hero />
      </Container>

      <Container pr="5" pl="5">
        <Flex direction="row" wrap="wrap" gap="4" justify={products.length < 3 || isCentered ? 'center' : 'start'}>

          <Show when={isLoading}>
            <For each={skeletons}>
              {skeleton => skeleton}
            </For>
          </Show>

          <For each={products}>
            {(product) => {
              return (
                <ProductCard
                  className={styles.cardItem}
                  imageAsSlider={true}
                  key={product.id}
                  product={product}
                  onClickCart={() => { handleClickOnCard(product); }}
                  cardActionSlot={(
                    <Flex align="center" gap="2">
                      <ButtonWithAuthPopup
                        size="1"
                        variant="soft"
                        color={product.isFavorite ? 'red' : 'gray'}
                        style={{ padding: '6px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleWishlist(product);
                        }}
                      >
                        <Tooltip content={product.isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'} side="top">
                          <Heart
                            size={12}
                            fill={product.isFavorite ? 'red' : 'transparent'}
                            color={product.isFavorite ? 'red' : 'gray'}
                          />
                        </Tooltip>
                      </ButtonWithAuthPopup>

                      <ButtonWithAuthPopup
                        size="1"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          void handleAddToCart(product);
                        }}
                      >
                        Add to Cart
                        {product.isDiscount && <Pulse size={8} />}
                      </ButtonWithAuthPopup>
                    </Flex>
                  )}
                />
              );
            }}
          </For>

        </Flex>
      </Container>

    </>
  );
}
