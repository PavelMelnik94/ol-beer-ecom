import { useArticlesRandom } from '@modules/articles/hooks/use-article-random';
import { Container } from '@radix-ui/themes';
import { ArticlePreview } from '../article-list/article-preview/article-preview';

export function ArticleRandom() {
  const { article } = useArticlesRandom()

  if (!article) return null;

  return (
    <Container pr="5" pl="5">
      <ArticlePreview article={article} sectionStyles={{ padding: 0 }} />
    </Container>
  )
}
