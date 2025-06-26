import { Box } from '@radix-ui/themes'
import { useParams } from 'react-router-dom'
import { ArticleDetails } from '@modules/articles'
import { Hero } from './ui/hero'

export function ArticlePage() {
  const { id } = useParams()

  return (
    <Box>
      <ArticleDetails id={String(id)} />
    </Box>
  )
}
