import type { CartPaymentRequest } from '@modules/cart/types';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useState } from 'react';
import styles from './checkout-button.module.scss';

interface CheckoutButtonProps {
  processPayment: (data: CartPaymentRequest) => void;
  paymentStatus: string;
}

export function CheckoutButton({ processPayment, paymentStatus }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    processPayment({ paymentMethod: 'pseudo' });
  };

  return (
    <Flex direction="column" gap="2" className={styles.checkout} justify="center">
      <Button
        color="green"
        variant="solid"
        size="3"
        onClick={handleCheckout}
        disabled={loading || paymentStatus === 'pending'}
      >
        Checkout
      </Button>
      {paymentStatus === 'pending' && (
        <Text color="gray" size="4">Payment is processing...</Text>
      )}
      {paymentStatus === 'error' && (
        <Text color="red" size="4">Payment error. Please try again.</Text>
      )}
      {paymentStatus === 'success' && (
        <Text color="green" size="4">Order placed successfully!</Text>
      )}
    </Flex>
  );
}
