import type { Product, ProductWithFavoritesAndRatings } from '@kernel/types';
import { AddToCartButton, ButtonWithAuthPopup } from '@modules/common';
import { ProductDetailsSkeleton } from '@modules/products/ui/product-details/product-details-skeleton';
import { Box, Container, Flex, ScrollArea, Separator, Text, Tooltip } from '@radix-ui/themes';
import { Carousel, Image, Show } from '@shared/components';
import { Bookmark } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { BreweryDescription } from './brewery-description/brewery-description';
import { ProductDatalist } from './product-datalist/product-datalist';
import styles from './product-details.module.scss';

interface ProductDetailsProps {
  product?: ProductWithFavoritesAndRatings | null;
  onClickRating?: (rating: number, productId: string) => void;
  onClickAddToWishlist?: (product: Product) => void;
}
export function ProductDetails({ product, onClickRating, onClickAddToWishlist }: ProductDetailsProps) {
  const [imageScrollAreaHeight, setImageScrollAreaHeight] = useState<number | undefined>(700);
  const isLargeScreen = useMediaQuery({ minWidth: 800 });

  const detailRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const computeHeight = () => {
      setImageScrollAreaHeight(detailRef.current?.clientHeight);
    };
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
        <Show when={!isLargeScreen}>
          <ScrollArea
            size="1"
            type="scroll"
            style={{
              height: imageScrollAreaHeight ?? '700px',
              width: '100%',
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
        </Show>

        <Show when={isLargeScreen}>
          <Carousel
            images={product.images}
            options={{ loop: true }}
            emblaContainerClassName={styles.carouselContainer}
            imageSizeMode="contain"
            height="600px"
            slideChangeDelay={2000}
            changeStrategy="autoscroll"
          />
        </Show>
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

        <ProductDatalist
          onClickRating={rating => onClickRating?.(rating, product.id)}
          product={product}
        />

        <Separator mt="5" mb="2" size="4" />

        <BreweryDescription
          brewerytitle={product.brewery.name}
          brewerydescription={product.brewery.description}
        />

        <Flex justify="center" mt="5" gap="2">
          <ButtonWithAuthPopup
            size="2"
            variant="soft"
            color={product.isFavorite ? 'ruby' : 'bronze'}
            style={{ padding: '6px' }}
            onClick={(e) => {
              e.stopPropagation();
              onClickAddToWishlist?.(product);
            }}
          >
            <Tooltip content={product.isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'} side="top">
              <Bookmark size={20} fill={product.isFavorite ? 'red' : 'transparent'} color={product.isFavorite ? 'red' : 'gray'} />
            </Tooltip>
          </ButtonWithAuthPopup>

          <AddToCartButton product={product} />
        </Flex>

      </Box>
    </Flex>
  );
}
