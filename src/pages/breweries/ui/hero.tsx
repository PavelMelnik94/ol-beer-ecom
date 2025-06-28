import { useGoTo } from '@kernel/index';
import { Button, Flex, Heading, Section } from '@radix-ui/themes';

export function Hero() {
  const { navigateToStore } = useGoTo()

  return (
    <Section>
      <Heading mb="2" size="9" align="center">Brewery Insights & Inspirations</Heading>
      <Heading mb="3" size="7" align="center">Step inside iconic breweries, discover their unique stories, and access exclusive tours and recommendations designed to enrich your beer journey.</Heading>
      <Flex justify="center" align="center">
        <Button size="2" onClick={navigateToStore}>
          Explore Now
        </Button>
      </Flex>
    </Section>
  )
}
