import { Button, Card, Flex, Text } from '@radix-ui/themes';
import styles from './cart-summary.module.scss';

interface CartSummaryProps {
  total: number;
  discountAmount?: number;
  itemCount: number;
  clearCart: () => void;
  clearCartStatus: string;
}

export function CartSummary({
  total,
  discountAmount,
  itemCount,
  clearCart,
  clearCartStatus,
}: CartSummaryProps) {
  return (
    <Card className={styles.card} variant="surface">
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
        <Button
          color="red"
          variant="soft"
          onClick={clearCart}
          disabled={clearCartStatus === 'pending'}
        >
          Clear cart
        </Button>
      </Flex>
    </Card>
  );
}
