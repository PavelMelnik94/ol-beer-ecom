import { Box, Button, Flex, Heading, Section } from '@radix-ui/themes';
import { Image, Show } from '@shared/components';
import { useMediaQuery } from 'react-responsive';

export function Hero() {
  const isColumnDirection = useMediaQuery({
    query: '(max-width: 1100px)',
  })
  const isMobile = useMediaQuery({
    query: '(max-width: 576px)',
  })

  return (
    <Section pb="0" pt={isMobile ? '4' : '9'}>
      <Flex gap="2" direction={isColumnDirection ? 'column' : 'row'}>
        <Box>
          <Heading mb="2" size="9" align="center">Your Guide to Liquid Gold</Heading>
          <Heading mb="3" size="7" align="center">From Belgian abbeys to American craft breweries, explore curated reviews, brewing insights, and exclusive marketplace finds that elevate your beer experience.</Heading>
        </Box>
        <Show when={!isColumnDirection}>
          <Image
            src="/illustrations/u_beer.svg"
            alt="have a fun"
          />
        </Show>

      </Flex>
      <Flex justify="center" align="center">
        <Button size="2">
          Explore Now
        </Button>
      </Flex>
    </Section>
  )
}
