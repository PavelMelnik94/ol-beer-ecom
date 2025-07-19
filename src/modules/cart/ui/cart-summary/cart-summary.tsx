import type { ReactNode } from 'react';
import { Card, Flex, Text } from '@radix-ui/themes';
import styles from './cart-summary.module.scss';

interface CartSummaryProperties {
  total: number;
  discountAmount?: number;
  itemCount: number;
  actionSlot?: ReactNode;
}

export function CartSummary({
  total,
  discountAmount,
  itemCount,
  actionSlot,
}: CartSummaryProperties) {
  return (
    <Card className={styles.card} data-wrapper>
      <Flex direction="column">
        <Text size="3" weight="bold" mb="4">
          Summary
        </Text>

        <Text size="5" weight="bold" mb="1">
          Total:
          {' '}
          {total.toFixed(2)}
          {' '}
          $
        </Text>
        {discountAmount && (
          <Text size="3" mb="1">
            Discount: -
            {discountAmount.toFixed(2)}
            {' '}
            $
          </Text>
        )}
        <Text size="3" color="gray" mb="4">
          Items:
          {' '}
          {itemCount}
        </Text>

        {actionSlot}

      </Flex>
    </Card>
  );
}
