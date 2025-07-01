import { Container } from '@radix-ui/themes';
import { useArticlesRandom } from '@modules/articles/hooks/use-article-random';
import { useEffect } from 'react';
import { ArticlePreview } from '../article-list/article-preview/article-preview';

export function ArticleRandom({ id }: { id: string }) {
  const { article, getRelatedArticle } = useArticlesRandom()

  useEffect(() => {
    getRelatedArticle()
  }, [id])
  if (!article) return null;

  return (
    <Container pr="5" pl="5">
      <ArticlePreview article={article} sectionStyles={{ padding: 0 }} />
    </Container>
  )
}
