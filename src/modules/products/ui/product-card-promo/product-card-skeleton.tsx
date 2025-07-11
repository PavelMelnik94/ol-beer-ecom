import { Card, Flex, Inset, Skeleton, Text } from '@radix-ui/themes';
import styles from './product-card.module.scss';

export function ProductCardSkeleton() {
  return (
    <Card size="2">
      <Inset clip="padding-box" side="top" pb="current">
        <Skeleton
          width="100%"
          height="100%"
          className={styles.imgContainer}
        />
      </Inset>

      <Text as="div" size="4" mb="1" mt="-2">
        <Skeleton width="80%" height="1.2rem" />
      </Text>

      <Flex mt="2" gap="1">
        <Skeleton width="60px" height="20px" />
        <Skeleton width="50px" height="20px" />
        <Skeleton width="45px" height="20px" />
      </Flex>

      <Flex justify="between" align="center" mt="1">
        <Text size="2">
          <Flex direction="row" gap="1">
            <Skeleton width="80px" height="1rem" />
          </Flex>
        </Text>
        <Flex>
          <Skeleton width="80px" height="28px" />
        </Flex>
      </Flex>
    </Card>
  );
}
