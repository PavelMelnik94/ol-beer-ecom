import { Box, Container } from '@radix-ui/themes'
import { ArticleList } from '@modules/articles'
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
