import type { Product } from '@kernel/types';
import { getOffPercent } from '@kernel/utils';
import { Badge, Button, Card, Flex, Inset, Strong, Text } from '@radix-ui/themes';
import { Image, Pulse } from '@shared/components';
import { HopBadge } from '@shared/components/ui/hop-badge';
import styles from './product-card.module.scss';

export function ProductCard({ product }: { product: Product; }) {
  return (
    <Card key={product.id} size="2" className="pointer">
      <Inset clip="padding-box" side="top" pb="current">
        <Image
          src={product.images[0]}
          alt={product.title}
          width="100%"
          height="auto"
          containerClassName={styles.imgContainer}
          sizeMode="responsive"
        />
      </Inset>
      <Text as="div" size="4" mb="1" mt="-2">
        <Strong>{product.title}</Strong>
      </Text>
      <Flex mt="2" gap="1">
        {product.categories.map(category => (
          <HopBadge key={category.name} text={category.name} size="small" />
        ))}
        {product.isDiscount && (
          <Badge color="green" radius="full">
            {getOffPercent(product.price, product.discount)}
            % off
          </Badge>
        )}
      </Flex>
      <Flex justify="between" align="center" mt="1">
        <Text size="2">
          <Flex direction="row" gap="1">
            Price:
            {' '}
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
                  <Strong>
                    $
                    {product.price}
                  </Strong>
                )}
          </Flex>
        </Text>
        <Flex>
          <Button size="1" variant="outline">
            Add to Cart
            {product.isDiscount && <Pulse size={8} />}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
