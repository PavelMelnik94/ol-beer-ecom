import { useGoTo } from '@kernel/hooks';
import { Box, Flex, Heading, Section } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { Alert } from '@shared/components/ui/alert/alert';
import { useConfetti } from '@shared/hooks';
import { Beer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@shared/hooks';

export function PaymentCongrats() {
  const isColumnDirection = useMediaQuery('(max-width: 1100px)');
  const isMobile = useMediaQuery('(max-width: 576px)');

  const [countdown, setCountdown] = useState(7);
  const navigateToBlog = useGoTo().navigateToBlog;
  useConfetti({ playWhen: true });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((previous) => {
        if (previous <= 1) {
          clearInterval(intervalId);
          navigateToBlog();
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [navigateToBlog]);

  return (
    <Section pt={isMobile ? '4' : '9'}>
      <Flex gap="4" direction="column" align="center">
        <Flex gap="2" direction={isColumnDirection ? 'column' : 'row'} align="center">
          <Box>
            <Heading mb="2" size="9" align="center">
              Thank you for your order!
            </Heading>
            <Heading mb="3" size="7" align="center">
              Your payment was successful. Your order has been received and will be processed soon.
              You can track your order status in your profile. Enjoy the best craft beer experience!
            </Heading>
          </Box>
          <Image
            src="/illustrations/u_congrats.svg"
            alt="order completed successfully"
          />
        </Flex>

        <Alert icon={<Beer />}>
          Automatic redirect to blog in
          {' '}
          {countdown}
          {' '}
          seconds...
        </Alert>
      </Flex>
    </Section>
  );
}
