import { BreweriesList } from '@modules/breweries/';
import { Box, Container } from '@radix-ui/themes';
import { Hero } from './ui/hero';

export function BreweriesPage() {
  return (
    <Box>
      <Container mr="5" ml="5">
        <Hero />
      </Container>
      <Container mr="5" ml="5">
        <BreweriesList />
      </Container>
    </Box>
  );
}
