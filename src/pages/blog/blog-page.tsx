import type { Product } from '@kernel/types';
import { useGoTo } from '@kernel/hooks';
import { useUserStore } from '@kernel/stores';
import { ArticleList } from '@modules/articles';
import { useCartStore, usePromoCode } from '@modules/cart';
import { useProductsRandom } from '@modules/products';
import { useToggleFavorite } from '@modules/user';
import { Box, Container } from '@radix-ui/themes';
import React, { useMemo } from 'react';
import { Hero } from './ui/hero';

const PromoCodeVelocity = React.lazy(() => import('@modules/cart').then(module => ({ default: module.PromoCodeVelocity })));

const ProductsGrid = React.lazy(() => import('@modules/products').then(module => ({ default: module.ProductsGrid })));

export function BlogPage() {
  const { products } = useProductsRandom(3);
  const { navigateToProductItem } = useGoTo();
  const { mutateAsync: toggleFavorite } = useToggleFavorite();
  const promo = usePromoCode();
  const favorites = useUserStore(s => s.favorites);
  const cartSize = useCartStore(s => s.addedItemIds.size);

  const handleClickPromoCode = async (promoCode: string) => {
    void promo.applyPromo({ promoCode });
  };

  const handleClickProductCard = (id: string) => {
    navigateToProductItem(id);
  };

  const handleOnClickAddToWishlist = async (product: Product) => {
    await toggleFavorite({ productId: product.id });
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
          every4: cartSize > 0 ? <PromoCodeVelocity onClickPromocode={handleClickPromoCode} /> : undefined,
          every7: (
            <Container>
              <ProductsGrid
                products={productsWithFavorites}
                columnsCount="3"
                onClickCard={({ id }) => { handleClickProductCard(id); }}
                onAddToWishlist={handleOnClickAddToWishlist}
              />
            </Container>
          ),
        }}
      />
    </Box>
  );
}
