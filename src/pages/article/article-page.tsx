import { useParams } from 'react-router-dom'
import { ArticleDetails } from '@modules/articles'

export function ArticlePage() {
  const { id } = useParams()

  return <ArticleDetails id={String(id)} />
}
