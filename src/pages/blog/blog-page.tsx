import { ArticleList } from '@modules/articles'
import { Box, Container } from '@radix-ui/themes'
import { Hero } from './ui/hero'

export function BlogPage() {
  return (
    <Box>
      <Container>
        <Hero />
      </Container>
      <ArticleList />
    </Box>
  )
}
