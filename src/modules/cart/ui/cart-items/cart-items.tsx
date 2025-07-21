import type { CartItem } from '../../types';
import { CartItem as CartItemCard } from '@modules/cart/ui/cart-item/cart-item';
import { Flex } from '@radix-ui/themes';
import { For, Show } from '@shared/components';
import { debounce } from 'lodash-es';
import React, { useEffect } from 'react';
import { cartModel } from '../../model';
import styles from './cart-items.module.scss';

interface CartItemsProperties {
  items: CartItem[];
  updateItem: (data: { id: string; quantity: number; }) => void;
  removeItem: (data: { id: string; }) => void;
  removeItemStatus: string;
  updateItemStatus: string;
}

export function CartItems(properties: CartItemsProperties) {
  const { updateItem, removeItem, removeItemStatus, updateItemStatus, items } = properties;
  const [localQuantities, setLocalQuantities] = React.useState<Record<string, number>>(() => cartModel.getInitialLocalQuantities(items));
  const [orderedItems, setOrderedItems] = React.useState<CartItem[]>(items);
  const activeElementReference = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setLocalQuantities(previous => cartModel.syncLocalQuantities(previous, items));

    setOrderedItems(previous => cartModel.updateOrderedItems(previous, items));

    if (activeElementReference.current) {
      activeElementReference.current.focus();
    }
  }, [items]);

  useEffect(() => {
    setOrderedItems(cartModel.updateOrderedItems([], items));
  }, [items]);

  const debouncedUpdateItem = React.useMemo(() => debounce(updateItem, 300), [updateItem]);

  const handleQuantityChange = React.useCallback((id: string, quantity: number, element?: HTMLInputElement) => {
    setLocalQuantities(q => ({ ...q, [id]: quantity }));
    if (element) activeElementReference.current = element;
    debouncedUpdateItem({ id, quantity });
  }, [debouncedUpdateItem]);

  return (
    <div className={styles.items}>

      <Show when={orderedItems.length > 0} fallback={<div className={styles.empty}>No items in cart</div>}>
        <Flex gap="3" className={styles.itemList} wrap="wrap">
          <For each={orderedItems}>
            {item => (
              <CartItemCard
                key={item.id}
                item={item}
                localQuantities={localQuantities}
                handleQuantityChange={handleQuantityChange}
                removeItem={removeItem}
                removeItemStatus={removeItemStatus}
                updateItemStatus={updateItemStatus}
              />
            )}
          </For>
        </Flex>
      </Show>
    </div>
  );
}
