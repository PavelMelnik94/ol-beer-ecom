import type { Product } from '@kernel/types';
import { Box, Button, DataList, Flex, ScrollArea, Separator, Strong, Text } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { HopBadge } from '@shared/components/ui/hop-badge';
import { useEffect, useRef, useState } from 'react';
import styles from './product-details.module.scss';

interface ProductDetailsProps {
  product: Product;
}
export function ProductDetails({ product }: ProductDetailsProps) {
  const [imageScrollAreaHeight, setImageScrollAreaHeight] = useState<number | undefined>(700);
  const detailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const computeHeight = () => setImageScrollAreaHeight(detailRef.current?.clientHeight);
    document.addEventListener('resize', computeHeight);

    return () => {
      document.removeEventListener('resize', computeHeight);
    };
  }, [detailRef.current?.clientHeight]);

  return (
    <Flex className={styles.container}>
      <Box className={styles.productImagesContainer}>
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

      <Box ref={detailRef} className={styles.productDetails}>
        <Text as="div" size="7" weight="bold" align="center" className={styles.productTitle} mt="4" mb="5">
          {product.title}
        </Text>

        <Text size="3" className={styles.productDescription}>
          {product.description}
        </Text>

        <DataList.Root mt="5">
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Category</DataList.Label>
            <DataList.Value>
              {product.categories.map(c =>
                <HopBadge key={c.id} text={c.name} size="small" />)}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Rating</DataList.Label>
            <DataList.Value>
              <Flex align="center" gap="2">
                {product.averageRating}
              </Flex>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">ABV</DataList.Label>
            <DataList.Value>
              {product.ABV}
              %
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">IBU</DataList.Label>
            <DataList.Value>
              {product.IBU}
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label minWidth="88px">Price</DataList.Label>
            <DataList.Value>
              {product.isDiscount
                ? (
                    <Flex direction="row" gap="2" align="center">
                      <Strong>
                        $
                        {product.discount}
                      </Strong>
                      <Text as="span" style={{ textDecoration: 'line-through' }}>
                        $
                        {product.price}
                      </Text>
                    </Flex>
                  )
                : (
                    <>
                      $
                      {product.price}
                    </>
                  )}
            </DataList.Value>
          </DataList.Item>

        </DataList.Root>

        <Separator mt="5" mb="5" size="4" />

        <Text size="3" as="div">
          {product.brewery.name}
        </Text>
        <Text size="2" color="gray">
          {product.brewery.description}
        </Text>

        <Flex justify="center" mt="5">
          <Button size="2" variant="outline">
            Add to Cart
          </Button>
        </Flex>

      </Box>
    </Flex>
  );
}
