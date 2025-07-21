import { NoData } from '@kernel/components';
import { useGoTo } from '@kernel/hooks';
import { PaymentCongrats } from '@modules/cart/ui/payment-congrats/payment-congrats';
import { Button, Container, Flex } from '@radix-ui/themes';
import { debounce } from 'lodash';
import React from 'react';
import { useCart, useCartItem, useCartPayment, usePromoCode } from '../hooks';
import { CartItems } from './cart-items/cart-items';
import styles from './cart-mediator.module.scss';
import { CartSummary } from './cart-summary/cart-summary';
import { CheckoutButton } from './checkout-button/checkout-button';
import { PromoCodeInput } from './promo-code-input/promo-code-input';

export function CartMediator() {
  const { cart, isLoading, isError, error, clearCart, clearCartStatus } = useCart({ enabled: true });
  const cartItem = useCartItem();
  const promo = usePromoCode();
  const payment = useCartPayment();
  const { navigateToShowcase } = useGoTo();

  const lockStatus = 'pending';

  const isLockUserInteraction = [
    clearCartStatus,
    payment.paymentStatus,
    cartItem.removeItemStatus,
    cartItem.updateItemStatus,
  ].includes(lockStatus);

  const activeElementReference = React.useRef<HTMLInputElement | null>(null);

  const [initialOrder, setInitialOrder] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (cart?.items && initialOrder.length === 0) {
      setInitialOrder(cart.items.map(item => item.id));
    }
  }, [cart?.items, initialOrder.length]);

  const orderedItems = React.useMemo(() => {
    if (!cart?.items) return [];

    const itemsMap = new Map(cart.items.map(item => [item.id, item]));
    return initialOrder.map(id => itemsMap.get(id)).filter(Boolean);
  }, [cart?.items, initialOrder]);

  const debouncedUpdateItem = React.useMemo(() => debounce(cartItem.updateItem, 300), [cartItem.updateItem]);

  const handleQuantityChange = React.useCallback((id: string, quantity: number) => {
    debouncedUpdateItem({ id, quantity });
  }, [debouncedUpdateItem]);

  React.useEffect(() => {
    if (activeElementReference.current) {
      activeElementReference.current.focus();
    }
  }, [cart?.items]);

  const localQuantities = React.useMemo(() => {
    const quantities: Record<string, number> = {};
    cart?.items.forEach(item => {
      quantities[item.id] = item.quantity;
    });
    return quantities;
  }, [cart?.items]);

  if (payment.paymentStatus === 'success') return <PaymentCongrats />;

  if (isLoading && !cart?.items.length) return <div className={styles.loading}>Loading cart...</div>;
  if (isError) {
    return (
      <div className={styles.error}>
        Error:
        {error?.message}
      </div>
    );
  }
  if (!cart?.items.length) {
    return (
      <div className={styles.empty}>
        <Container>
          <Flex justify="center" align="center" direction="column" mt="9">
            <NoData
              entity="Cart"
              actionSlot={
                <Button size="2" onClick={navigateToShowcase}>Go store</Button>
              }
            />
          </Flex>
        </Container>
      </div>
    );
  };

  return (
    <div className={styles.layout}>
      <div className={styles.itemsCol}>
        <CartItems
          items={orderedItems.filter(Boolean).map(item => ({ ...item!, quantity: localQuantities[item!.id] ?? 0 }))}
          removeItem={cartItem.removeItem}
          removeItemStatus={cartItem.removeItemStatus}
          updateItemStatus={cartItem.updateItemStatus}
          localQuantities={localQuantities}
          handleQuantityChange={handleQuantityChange}
        />
      </div>

      <div className={styles.additionalCol}>
        <PromoCodeInput
          promoCode={cart.promoCode}
          applyPromo={promo.applyPromo}
          applyPromoStatus={promo.applyPromoStatus}
          removePromo={promo.removePromo}
          removePromoStatus={promo.removePromoStatus}
        />
        <CartSummary
          total={cart.total}
          discountAmount={cart.discountAmount}
          itemCount={cart.items.length}
          actionSlot={(
            <>
              <Button
                className={styles.clearCartButton}
                data-clear-cart-button
                color="red"
                variant="ghost"
                onClick={() => { clearCart(); }}
                disabled={isLockUserInteraction}
              >
                Clear cart
              </Button>

              <CheckoutButton
                processPayment={payment.processPayment}
                paymentStatus={payment.paymentStatus}
              />
            </>
          )}
        />

      </div>
    </div>
  );
}
