import { Box, Flex, Heading, Section } from '@radix-ui/themes';
import { Image, Show } from '@shared/components';
import { useMediaQuery } from 'react-responsive';

export function Hero() {
  const isMobile = useMediaQuery({
    query: '(max-width: 576px)',
  });

  return (
    <Section pb="0" pt={isMobile ? '7' : '9'}>
      <Flex gap="2" direction="row">
        <Box>
          <Heading mb="2" size="9" align="center">
            Your Favorite Beers
          </Heading>
          <Heading mb="3" size="7" align="center">
            Your personal collection of the best brews. Save your favorite beers here and never lose track of the ones you love most.
          </Heading>
        </Box>
        <Show when={!isMobile}>
          <Image
            src="/illustrations/u_favor.svg"
            alt="favorite item"
          />
        </Show>

      </Flex>

    </Section>
  );
}
