import type { Product, ProductWithFavoritesAndRatings } from '@kernel/types';
import { ButtonWithAuthPopup } from '@modules/common';
import { ProductDetailsSkeleton } from '@modules/products/ui/product-details/product-details-skeleton';
import { Box, Container, Flex, ScrollArea, Separator, Text } from '@radix-ui/themes';
import { Image, Pulse } from '@shared/components';
import { useEffect, useRef, useState } from 'react';
import { BreweryDescription } from './brewery-description/brewery-description';
import { ProductDatalist } from './product-datalist/product-datalist';
import { ProductDetailsActionBlock } from './product-details-action-block/product-details-action-block';
import styles from './product-details.module.scss';

interface ProductDetailsProps {
  product?: ProductWithFavoritesAndRatings | null;
  onClickRating?: (rating: number, productId: string) => void;
  onClickAddToWishlist?: (product: Product) => void;
}
export function ProductDetails({ product, onClickRating, onClickAddToWishlist }: ProductDetailsProps) {
  const [imageScrollAreaHeight, setImageScrollAreaHeight] = useState<number | undefined>(700);

  const detailRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const computeHeight = () => setImageScrollAreaHeight(detailRef.current?.clientHeight);
    document.addEventListener('resize', computeHeight);

    return () => {
      document.removeEventListener('resize', computeHeight);
    };
  }, [detailRef.current?.clientHeight]);

  if (!product) {
    return <Container pr="5" pl="5" pt="5" pb="5"><ProductDetailsSkeleton /></Container>;
  }

  return (
    <Flex className={styles.container}>
      <Box ref={imageContainerRef} className={styles.productImagesContainer}>
        <ScrollArea
          size="1"
          type="scroll"
          style={{
            height: imageScrollAreaHeight ?? '700px',
          }}
        >
          {product.images.map((image, index) => {
            return (
              <Image
                key={index}
                src={image}
                alt={image || `Product image ${index + 1}`}
                containerClassName={styles.productImage}
              />
            );
          })}
        </ScrollArea>
      </Box>

      <Box
        ref={detailRef}
        className={styles.productDetails}

      >

        <div className={styles.scrollThumb} />
        <Text as="div" size="7" weight="bold" align="center" className={styles.productTitle} mt="4" mb="5">
          {product.title}
        </Text>

        <Text size="3" className={styles.productDescription}>
          {product.description}
        </Text>

        <ProductDatalist product={product} />

        <Separator mt="5" mb="2" size="4" />

        <ProductDetailsActionBlock
          isFavorite={product.isFavorite}
          userRating={product.userRating}
          onClickAddToWishlist={() => onClickAddToWishlist?.(product)}
          onClickRating={rating => onClickRating?.(rating, product.id)}
        />

        <BreweryDescription
          brewerytitle={product.brewery.name}
          brewerydescription={product.brewery.description}
        />

        <Flex justify="center" mt="5">
          <ButtonWithAuthPopup size="2" variant="outline">
            Add to Cart
            {' '}
            <Pulse size={10} />
          </ButtonWithAuthPopup>
        </Flex>

      </Box>
    </Flex>
  );
}
