import { useArticlesRandom } from '@modules/articles/hooks/use-article-random';
import { Container } from '@radix-ui/themes';
import React from 'react';
import { ArticlePreview } from '../article-preview/article-preview';

export const ArticleRandom = React.memo(({ excludeId }: { excludeId: string; }) => {
  const { article } = useArticlesRandom(excludeId);

  if (!article) return null;

  return (
    <Container pr="5" pl="5">
      <ArticlePreview article={article} sectionStyles={{ padding: 0 }} />
    </Container>
  )
})
