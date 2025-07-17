import { NoData } from '@kernel/components';
import { useGoTo } from '@kernel/hooks';
import { Button, Container, Flex } from '@radix-ui/themes';
import { useCart, useCartItem, useCartPayment, usePromoCode } from '../hooks';
import { CartItems } from './cart-items/cart-items';
import styles from './cart-mediator.module.scss';
import { CartSummary } from './cart-summary/cart-summary';
import { CheckoutButton } from './checkout-button/checkout-button';
import { PromoCodeInput } from './promo-code-input/promo-code-input';

export function CartMediator() {
  const { cart, isLoading, isError, error, clearCart, clearCartStatus } = useCart();
  const cartItem = useCartItem();
  const promo = usePromoCode();
  const payment = useCartPayment();
  const { navigateToShowcase } = useGoTo();

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
          items={cart?.items ?? []}
          updateItem={cartItem.updateItem}
          removeItem={cartItem.removeItem}
          removeItemStatus={cartItem.removeItemStatus}
          updateItemStatus={cartItem.updateItemStatus}
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
                color="red"
                variant="soft"
                onClick={() => { clearCart(); }}
                disabled={clearCartStatus === 'pending'}
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
