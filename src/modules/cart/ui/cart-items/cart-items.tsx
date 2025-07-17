import type { CartItem } from '../../types';
import { CartItem as CartItemCard } from '@modules/cart/ui/cart-item/cart-item';
import { Flex } from '@radix-ui/themes';
import { For, Show } from '@shared/components';
import { debounce } from 'lodash-es';
import React from 'react';
import { cartModel } from '../../model';
import styles from './cart-items.module.scss';

interface CartItemsProps {
  items: CartItem[];
  updateItem: (data: { id: string; quantity: number; }) => void;
  removeItem: (data: { id: string; }) => void;
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

      <Show when={items.length > 0} fallback={<div className={styles.empty}>No items in cart</div>}>
        <Flex  gap="3" className={styles.itemList} wrap={'wrap'}>
          <For each={items}>
            {item => (
              <CartItemCard
                key={item.id}
                item={item}
                localQuantities={localQuantities}
                handleQuantityChange={handleQuantityChange}
                removeItem={removeItem}
                removeItemStatus={removeItemStatus}
              />
            )}
          </For>
        </Flex>
      </Show>
    </div>
  );
}
