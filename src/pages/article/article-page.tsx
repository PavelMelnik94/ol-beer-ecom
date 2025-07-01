import { ArticleDetails } from '@modules/articles'
import { useParams } from 'react-router-dom'

export function ArticlePage() {
  const { id } = useParams()

  return <ArticleDetails id={String(id)} />
}
