import { Heading, Section, Text } from '@radix-ui/themes';

export function Hero() {
  return (
    <Section>
      <Heading mb="2" size="9">Typographic principles</Heading>
      <Heading mb="2" size="9" className="playfair-bold">Typographic principles</Heading>
      <Text>The goal of typography is to relate font size, line height, and line width in a proportional way that maximizes beauty and makes reading easier and more pleasant.</Text>
    </Section>
  )
}
