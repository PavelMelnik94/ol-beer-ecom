import { useCart } from '../hooks';
import { useCartItem } from '../hooks';
import { usePromoCode } from '../hooks';
import { useCartPayment } from '../hooks';
import { CartItems } from './cart-items';
import { CartSummary } from './cart-summary';
import { PromoCodeInput } from './promo-code-input';
import { CheckoutButton } from './checkout-button';
import styles from './cart-mediator.module.scss';
import { Theme } from '@radix-ui/themes';

export function CartMediator() {
  const { cart, isLoading, isError, error, clearCart, clearCartStatus } = useCart();
  const cartItem = useCartItem();
  const promo = usePromoCode();
  const payment = useCartPayment();

  if (isLoading) return <div className={styles.loading}>Loading cart...</div>;
  if (isError) return <div className={styles.error}>Error: {error?.message}</div>;
  if (!cart) return <div className={styles.empty}>Cart is empty</div>;

  return (
    <Theme appearance="light" accentColor="amber" radius="large">
      <div className={styles.mediator}>
        <CartItems
          items={cart.items}
          updateItem={cartItem.updateItem}
          removeItem={cartItem.removeItem}
          removeItemStatus={cartItem.removeItemStatus}
        />
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
          clearCart={clearCart}
          clearCartStatus={clearCartStatus}
        />
        <CheckoutButton
          processPayment={payment.processPayment}
          paymentStatus={payment.paymentStatus}
        />
      </div>
    </Theme>
  );
}
