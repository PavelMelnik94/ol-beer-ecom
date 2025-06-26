import { ArticleList } from '@modules/articles'
import { Box } from '@radix-ui/themes'
import { Hero } from './ui/hero'

export function HomePage() {
  return (
    <Box>
      <Hero />
      <ArticleList />
    </Box>
  )
}
