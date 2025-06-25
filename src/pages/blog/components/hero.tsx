import { Button, Flex, Heading, Section } from '@radix-ui/themes';

export function Hero() {
  return (
    <Section>
      <Heading mb="2" size="9" align="center">Your Guide to Liquid Gold</Heading>
      <Heading mb="2" size="7" align="center">From Belgian abbeys to American craft breweries, explore curated reviews, brewing insights, and exclusive marketplace finds that elevate your beer experience.</Heading>
      <Flex justify="center" align="center">
        <Button>
          Explore Now
        </Button>
      </Flex>
    </Section>
  )
}
