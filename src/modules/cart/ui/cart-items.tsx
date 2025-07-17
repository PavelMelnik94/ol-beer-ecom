import React from 'react';
import type { CartItem } from '../types';
import styles from './cart-items.module.scss';
import { Card, Flex, Button } from '@radix-ui/themes';
import { InputText } from '@shared/components/ui/input-text/input-text';
import { debounce } from 'lodash-es';
import { cartModel } from '../model';

interface CartItemsProps {
  items: CartItem[];
  updateItem: (data: { id: string; quantity: number }) => void;
  removeItem: (data: { id: string }) => void;
  removeItemStatus: string;
}


export function CartItems(props: CartItemsProps) {
  const { items, updateItem, removeItem, removeItemStatus } = props;
  const [localQuantities, setLocalQuantities] = React.useState<Record<string, number>>(() => cartModel.getInitialLocalQuantities(props.items));

  React.useEffect(() => {
    setLocalQuantities(prev => cartModel.syncLocalQuantities(prev, props.items));
  }, [props.items]);

  const debouncedUpdateItem = React.useMemo(() => debounce(updateItem, 300), [updateItem]);

  const handleQuantityChange = React.useCallback((id: string, quantity: number) => {
    setLocalQuantities(q => ({ ...q, [id]: quantity }));
    debouncedUpdateItem({ id, quantity });
  }, [debouncedUpdateItem]);

  return (
    <div className={styles.items}>
      {items.length === 0 ? (
        <div className={styles.empty}>No items in cart</div>
      ) : (
        <Flex direction="column" gap="3">
          {items.map(item => (
            <Card key={item.id} className={styles.item} variant="surface">
              <Flex align="center" justify="between">
                <div className={styles.info}>
                  <span className={styles.title}>{item.product.title}</span>
                  <span className={styles.price}>{item.product.price} ₽</span>
                </div>
                <Flex align="center" gap="2">
                  <InputText
                    type="number"
                    min={1}
                    value={String(localQuantities[item.id] ?? item.quantity)}
                    label="Quantity"
                    className={styles.quantity}
                    onChange={e => handleQuantityChange(item.id, Number((e.target as HTMLInputElement).value))}
                  />
                  <Button
                    color="red"
                    variant="soft"
                    onClick={() => { removeItem({ id: item.id }); }}
                    disabled={removeItemStatus === 'pending'}
                  >
                    Remove
                  </Button>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      )}
    </div>
  );
}
