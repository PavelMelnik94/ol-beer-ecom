import { ArticleList } from '@modules/articles'
import { Box, Container } from '@radix-ui/themes'
import { Hero } from './ui/hero'

export function HomePage() {
  return (
    <Box>
      <Container pr="5" pl="5">
        <Hero />
      </Container>

      <ArticleList />

    </Box>
  )
}
