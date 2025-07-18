import type { Product } from '@kernel/types';
import { useGoTo } from '@kernel/hooks';
import { useUserStore } from '@kernel/stores';
import { ArticleList } from '@modules/articles';
import { PromoCodeVelocity, useCartItem, usePromoCode } from '@modules/cart';
import { ProductsGrid, useProductsRandom } from '@modules/products';
import { useToggleFavorite } from '@modules/user';
import { Box, Container } from '@radix-ui/themes';
import { useMemo } from 'react';
import { Hero } from './ui/hero';

export function BlogPage() {
  const { products } = useProductsRandom(3);
  const { navigateToProductItem } = useGoTo();
  const { mutateAsync: toggleFavorite } = useToggleFavorite();
  const promo = usePromoCode();
  const cartItem = useCartItem();
  const favorites = useUserStore(s => s.favorites);

  const handleClickPromoCode = async (promoCode: string) => {
    void promo.applyPromo({ promoCode });
  };

  const handleClickProductCard = (id: string) => {
    navigateToProductItem(id);
  };

  const handleOnClickAddToWishlist = async (product: Product) => {
    await toggleFavorite({ productId: product.id });
  };

  const handleClickToAddCart = async (product: Product) => {
    await cartItem.addItem({ productId: product.id, quantity: 1 });
  };

  const productsWithFavorites = useMemo(() => {
    return products?.map(product => ({
      ...product,
      isFavorite: favorites.some(fav => fav.productId === product.id) ?? false,
    }));
  }, [favorites, products]);

  return (
    <Box>
      <Container>
        <Hero />
      </Container>
      <ArticleList
        promoSlots={{
          every4: <PromoCodeVelocity onClickPromocode={handleClickPromoCode} />,
          every7: (
            <Container>
              <ProductsGrid
                products={productsWithFavorites}
                columnsCount="3"
                onClickCard={({ id }) => { handleClickProductCard(id); }}
                onAddToBasket={handleClickToAddCart}
                onAddToWishlist={handleOnClickAddToWishlist}
              />
            </Container>
          ),
        }}
      />
    </Box>
  );
}
