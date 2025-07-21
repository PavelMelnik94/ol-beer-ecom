import type { CartItem } from '../../types';
import { CartItem as CartItemCard } from '@modules/cart/ui/cart-item/cart-item';
import { Flex } from '@radix-ui/themes';
import { For, Show } from '@shared/components';
import styles from './cart-items.module.scss';

interface CartItemsProperties {
  items: CartItem[];
  removeItem: (data: { id: string; }) => void;
  removeItemStatus: string;
  updateItemStatus: string;
  localQuantities: Record<string, number>;
  handleQuantityChange: (id: string, quantity: number, element?: HTMLInputElement) => void;
}

export function CartItems(properties: CartItemsProperties) {
  const { removeItem, removeItemStatus, updateItemStatus, items, localQuantities, handleQuantityChange } = properties;

  return (
    <div className={styles.items}>
      <Show when={items.length > 0} fallback={<div className={styles.empty}>No items in cart</div>}>
        <Flex gap="3" className={styles.itemList} wrap="wrap">
          <For each={items}>
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
