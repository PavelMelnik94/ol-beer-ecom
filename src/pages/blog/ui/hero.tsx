import { Box, Flex, Heading, Section } from '@radix-ui/themes';
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
    <Section pb="0" pt={isMobile ? '7' : '9'}>
      <Flex gap="2" direction={isColumnDirection ? 'column' : 'row'}>
        <Box>
          <Heading mb="2" size="9" align="center">Discover Beer Beyond the Glass</Heading>
          <Heading mb="3" size="7" align="center">Dive into expert reviews, brewing stories, and insider guides. From rare finds to brewing trends, our blog connects you to the world of craft beer—one post at a time.</Heading>
        </Box>
        <Show when={!isColumnDirection}>
          <Image
            src="/illustrations/u_blog.svg"
            alt="have a fun"
          />
        </Show>

      </Flex>

    </Section>
  )
}
