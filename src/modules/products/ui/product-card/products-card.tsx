import type { Product } from '@kernel/types';
import { Price } from '@kernel/components';
import { getOffPercent } from '@kernel/utils';
import { Badge, Box, Card, Flex, Inset, Strong, Text } from '@radix-ui/themes';
import { Carousel, Image } from '@shared/components';
import { HopBadge } from '@shared/components/ui/hop-badge';
import clsx from 'clsx';
import { Coins } from 'lucide-react';
import styles from './product-card.module.scss';

interface Props {
  product: Product;
  onClickCart: () => void;
  cardActionSlot?: React.ReactNode;
  imageAsSlider?: boolean;
  className?: string;
}
export function ProductCard({ product, onClickCart, cardActionSlot, imageAsSlider = false, className }: Props) {
  return (
    <Card key={product.id} size="2" className={clsx('pointer', styles.cardContainer, className)} onClick={onClickCart}>
      <Inset clip="padding-box" side="top" pb="current">
        {imageAsSlider
          ? (
              <Carousel
                images={product.images}
                imgContainerClassName={styles.imgContainer}
              />
            )
          : (
              <Image
                src={product.images[0]}
                alt={product.title}
                width="100%"
                height="auto"
                containerClassName={styles.imgContainer}
                sizeMode="background"
                skeletonStyle={{ width: '100%', height: '100%' }}
              />
            )}

      </Inset>

      <Flex direction="column" justify="between" align="stretch" className={styles.flexFullHeight}>
        <Box>
          <Text as="div" size="4" mb="1" mt="-2">
            <Strong>{product.title}</Strong>
          </Text>
          <Flex mt="2" gap="1">
            {product.categories.map(category => (
              <HopBadge key={category.name} text={category.name} size="small" />
            ))}
            {product.isDiscount && (
              <Badge color="green" radius="full">
                <Coins size={14} />
                {getOffPercent(product.price, product.discount)}
                % off
              </Badge>
            )}
          </Flex>
        </Box>

        <Box className={styles.cardFooter}>
          <Flex justify="between" align="center" mt="1">
            <Text size="2">
              <Flex direction="row" gap="1">
                Price:
                {' '}
                <Price price={product.price} discount={product.discount} />
              </Flex>
            </Text>
            <Flex>
              {cardActionSlot}

            </Flex>
          </Flex>
        </Box>

      </Flex>

    </Card>
  );
}
