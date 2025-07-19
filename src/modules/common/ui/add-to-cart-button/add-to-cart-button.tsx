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
  const getOrderIdByProductId = useCartStore(s => s.getOrderIdByProductId);

  const handleAddToCart = async () => {
    await cartItem.addItem({ productId: product.id, quantity: 1 });
  };

  const handleRemoveFromCart = async () => {
    const orderId = getOrderIdByProductId(product.id);

    if (!orderId) return;
    await cartItem.removeItem({ id: orderId });
  };

  const handler = isAdded ? handleRemoveFromCart : handleAddToCart;

  return (
    <ButtonWithAuthPopup
      size="1"
      variant="outline"
      color={isAdded ? 'red' : 'green'}
      onClick={(event) => {
        event.stopPropagation();
        void handler();
      }}
      disabled={cartItem.updateItemStatus === 'pending' || cartItem.addItemStatus === 'pending'}
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
