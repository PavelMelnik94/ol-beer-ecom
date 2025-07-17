import type { ReactNode } from 'react';
import { Button, Card, Flex, Text } from '@radix-ui/themes';
import styles from './cart-summary.module.scss';

interface CartSummaryProps {
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
}: CartSummaryProps) {
  return (
    <Card className={styles.card} data-wrapper>
      <Flex direction="column" gap="3">
        <Text size="5" weight="bold" color="amber">
          Total:
          {' '}
          {total}
          {' '}
          ₽
        </Text>
        {discountAmount
          ? (
              <Text size="3" color="bronze">
                Discount: -
                {discountAmount}
                {' '}
                ₽
              </Text>
            )
          : null}
        <Text size="3" color="gray">
          Items:
          {' '}
          {itemCount}
        </Text>

        {actionSlot}

      </Flex>
    </Card>
  );
}
