import type { Product } from '@kernel/types';
import { useCartItem, useCartStore } from '@modules/cart';
import { ButtonWithAuthPopup } from '@modules/common/ui/button-with-auth-popup';
import { Pulse, Show } from '@shared/components';

export function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const cartItem = useCartItem();
  const isAdded = useCartStore(s => s.hasItemId(product.id));

  const handleAddToCart = async () => {
    cartItem.addItem({ productId: product.id, quantity: 1 });
  };

  const handleRemoveFromCart = async () => {
    cartItem.removeItem({ id: product.id });
  };

  const handler = isAdded ? handleRemoveFromCart : handleAddToCart;

  return (
    <ButtonWithAuthPopup
      size="1"
      variant="outline"
      color={isAdded ? 'red' : 'green'}
      onClick={(e) => {
        e.stopPropagation();
        void handler();
      }}
    >
      <Show when={!isAdded}>
        Add to Cart
        {product.isDiscount && <Pulse size={8} />}
      </Show>

      <Show when={isAdded}>
        Remove from Cart
      </Show>
    </ButtonWithAuthPopup>
  );
}
