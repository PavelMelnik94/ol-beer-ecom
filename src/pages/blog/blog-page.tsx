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
    throw new Error('Not implemented');
  };

  const handleClickProductCard = (id: string) => {
    navigateToProductItem(id);
  };

  const onAddToBasket = (product: Product) => {
    throw new Error(`Not implemented, ${product.id}`);
  };
  const onAddToWishlist = (product: Product) => {
    throw new Error(`Not implemented, ${product.id}`);
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
                onClickCard={({ id }) => { handleClickProductCard(id); }}
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
