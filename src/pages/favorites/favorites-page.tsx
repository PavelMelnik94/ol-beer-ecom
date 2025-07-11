import type { FavoriteProduct, Product, ProductWithFavorites } from '@kernel/types';
import { NoData } from '@kernel/components';
import { useGoTo } from '@kernel/hooks';
import {
  ProductsGrid,
} from '@modules/products';
import { useToggleFavorite, useUserFavorites, useUserStore } from '@modules/user';
import { Box, Button, Container, Flex } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { Hero } from './ui/hero';

export function FavoritesPage() {
  useUserFavorites({ enabled: true });
  const { mutateAsync: toggleFavorite } = useToggleFavorite();

  const favoritesProducts = useUserStore(state => state.favorites);

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

  return (
    <Flex direction="column" align="center" justify="center" flexGrow="1">
      <Show when={products?.length > 0}>
        <Container pr="5" pl="5" mb="8">
          <Hero />
        </Container>
      </Show>

      <Box pr="5" pl="5">
        <Show
          when={products?.length > 0}
          fallback={(
            <NoData
              mt="9"
              actionSlot={
                <Button size="2" onClick={navigateToShowcase}>Go store</Button>
              }
            />
          )}
        >
          <ProductsGrid
            products={products}
            onClickCard={handleClickOnCard}
            onAddToBasket={() => {
              throw new Error('not implemented');
            }}
            onAddToWishlist={handleToggleWishlist}
          />
        </Show>
      </Box>

    </Flex>
  );
}
