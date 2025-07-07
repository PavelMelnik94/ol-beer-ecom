import type { Product } from '@kernel/types';
import { useGoTo } from '@kernel/hooks';
import { PromoCodeVelocity } from '@modules/cart';
import { ProductDetails, ProductDetailsSkeleton, ProductsGrid, useProductDetails, useProductsRelated } from '@modules/products';
import { Box, Container, Text } from '@radix-ui/themes';
import { Breadcrumbs } from '@shared/components';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export function ProductDetailsPage() {
  const { navigateToProductItem } = useGoTo();
  const { id } = useParams<{ id: string; }>();
  const { product, isLoading } = useProductDetails(id!);
  const { products: relatedProducts } = useProductsRelated(product?.id ?? '');
  const isMobile = window.innerWidth < 768;

  const breadcrumbs = useMemo(() => {
    const items = [
      { label: 'Showcase', to: '/showcase' },
      product?.brewery?.name && product?.brewery?.id
        ? { label: product.brewery.name, to: `/showcase?breweryId=${product.brewery.id}` }
        : null,
      product
        ? { label: product.title, to: `/products/${product.id}` }
        : null,
    ];
    return items.filter((item): item is { label: string; to: string; } => Boolean(item && item.label));
  }, [product]);

  if (isLoading || !product) {
    return <Container pr="5" pl="5" pt="5" pb="5"><ProductDetailsSkeleton /></Container>;
  }

  const handleClickOnCard = (product: Product) => {
    navigateToProductItem(product.id);
  };

  const handleOnClickRating = (rating: number, productId: string) => {
    // Handle product rating click
    console.log('Product rating clicked:', rating, 'Product ID:', productId);
  };

  const handleOnClickAddToWishlist = (product: Product) => {
    // Handle adding product to wishlist
    console.log('Add to wishlist:', product);
  };

  return (
    <div>
      {isMobile
        ? (
            <>
              <Box pr="1" pl="1" pt="1">
                <Breadcrumbs items={breadcrumbs} />
              </Box>
              <ProductDetails
                product={product}
                onClickRating={handleOnClickRating}
                onClickAddToWishlist={handleOnClickAddToWishlist}
              />
            </>
          )
        : (
            <Container pr="5" pl="5" pt="5" pb="5">
              <Breadcrumbs items={breadcrumbs} />
              <ProductDetails
                product={product}
                onClickRating={handleOnClickRating}
                onClickAddToWishlist={handleOnClickAddToWishlist}
              />
            </Container>
          )}

      <Box mt="5">
        <PromoCodeVelocity />
      </Box>

      <Box pr="5" pl="5" mt="9">
        <Text as="div" size="7" weight="bold" align="center" mb="3">
          Related Products
        </Text>
        <ProductsGrid
          products={relatedProducts}
          onClickCard={handleClickOnCard}
          isShow={relatedProducts && relatedProducts?.length > 0}
          imageAsSlider
          onAddToWishlist={(product) => {
            // Handle adding product to wishlist
            console.log('Add to wishlist:', product);
          }}
          onAddToBasket={(product) => {
            // Handle adding product to basket
            console.log('Add to basket:', product);
          }}
        />
      </Box>
    </div>
  );
}
