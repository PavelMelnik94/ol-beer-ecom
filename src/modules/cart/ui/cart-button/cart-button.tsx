import { useCartStore } from '@modules/cart/stores/cart-store';
import { Badge, Button, Flex, Text } from '@radix-ui/themes';
import clsx from 'clsx';
import { ShoppingCart } from 'lucide-react';
import styles from './cart-button.module.scss';

export function CartButton({ fullWidth, onClick }: { fullWidth?: boolean; onClick?: () => void; }) {
  const addedItemsSize = useCartStore(s => s.addedItemIds.size);

  return (
    <Button
      variant="ghost"
      size="1"
      className={clsx(styles.cartBtn, { [styles.cartBtnFull]: fullWidth })}
      style={fullWidth ? { width: '100%' } : undefined}
      onClick={onClick}
    >
      <Flex align="center" gap="1" justify={fullWidth ? 'between' : 'center'} style={{ width: '100%' }}>
        <Flex align="center" gap="2">
          <ShoppingCart size={16} />
          <Text>Cart</Text>
        </Flex>
        {addedItemsSize > 0 && <Badge size="1" color="bronze">{addedItemsSize}</Badge>}
      </Flex>
    </Button>
  );
}
