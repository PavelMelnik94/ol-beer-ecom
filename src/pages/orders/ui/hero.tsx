import { Box, Flex, Heading, Section } from '@radix-ui/themes';
import { Image, Show } from '@shared/components';
import { useMediaQuery } from 'react-responsive';

export function Hero() {
  const isMobile = useMediaQuery({
    query: '(max-width: 1200px)',
  });

  return (
    <Section pb="0" pt={isMobile ? '7' : '9'}>
      <Flex gap="2" direction="row">
        <Box>
          <Heading mb="2" size="9" align="center">
            Your Beer Orders
          </Heading>
          <Heading mb="3" size="7" align="center">
            Track and manage all your beer purchases in one place. View your order history, details, and delivery status for every brew you’ve bought.
          </Heading>
        </Box>
        <Show when={!isMobile}>
          <Image
            src="/illustrations/u_delivered.svg"
            alt="beer orders illustration"
          />
        </Show>
      </Flex>
    </Section>
  );
}
