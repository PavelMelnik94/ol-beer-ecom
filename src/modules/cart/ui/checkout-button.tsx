import styles from './checkout-button.module.scss';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useState } from 'react';

interface CheckoutButtonProps {
  processPayment: (data: unknown) => void;
  paymentStatus: string;
}

export function CheckoutButton({ processPayment, paymentStatus }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    processPayment({ paymentMethod: 'pseudo' });
  };

  return (
    <Flex direction="column" gap="2" className={styles.checkout}>
      <Button
        color="amber"
        variant="solid"
        size="3"
        onClick={handleCheckout}
        disabled={loading || paymentStatus === 'pending'}
      >
        Checkout
      </Button>
      {paymentStatus === 'pending' && (
        <Text color="gray" size="2">Payment is processing...</Text>
      )}
      {paymentStatus === 'error' && (
        <Text color="red" size="2">Payment error. Please try again.</Text>
      )}
      {paymentStatus === 'success' && (
        <Text color="green" size="2">Order placed successfully!</Text>
      )}
    </Flex>
  );
}
