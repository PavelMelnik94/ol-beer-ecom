import { Box } from '@radix-ui/themes'
import { BreweriesList } from '@modules/breweries/'
import { Hero } from './ui/hero'

export function BreweriesPage() {
  return (
    <Box>
      <Hero />
      <BreweriesList />
    </Box>
  )
}
