import type { Product } from '@kernel/types';
import { useGoTo } from '@kernel/hooks';
import { ArticleList } from '@modules/articles';
import { PromoCodeVelocity } from '@modules/cart';
import { ProductsGrid, useProductsRandom } from '@modules/products';
import { Box, Container } from '@radix-ui/themes';
import { Hero } from './ui/hero';

export function BlogPage() {
  const { products } = useProductsRandom(3);
  const { navigateToProductItem } = useGoTo();

  const handleClickPromocode = () => {
    // todo: not implemented
    console.log('Promo code clicked!');
  };

  const handleClickProductCard = (id: string) => {
    navigateToProductItem(id);
  };

  const onAddToBasket = (product: Product) => {
    // TODO: Not implemented
    console.log('Add to basket:', product);
  };
  const onAddToWishlist = (product: Product) => {
    // TODO: Not implemented
    console.log('Add to wishlist:', product);
  };
  return (
    <Box>
      <Container>
        <Hero />
      </Container>
      <ArticleList
        promoSlots={{
          every4: <PromoCodeVelocity onClickPromocode={handleClickPromocode} />,
          every7: (
            <Container>
              <ProductsGrid
                products={products}
                columnsCount="3"
                onClickCard={({ id }) => handleClickProductCard(id)}
                onAddToBasket={onAddToBasket}
                onAddToWishlist={onAddToWishlist}
              />
            </Container>
          ),
        }}
      />
    </Box>
  );
}
