import { useGlobalScroll } from '@kernel/index';
import { useLikeArticle } from '@modules/articles/hooks/use-like-article';
import { Box, Container, Section } from '@radix-ui/themes';
import { useLayoutEffect } from 'react';
import { useArticlesDetails } from '../../hooks/use-article-details';
import { LikeAndComment } from '../like-and-comment/like-and-comment';
import { ArticleComments } from './article-comments/article-comments';
import { ArticleContent } from './article-content/article-content';
import { ArticleRandom } from './article-random';
import { ArticleSkeleton } from './article-skeleton/article-skeleton';

export function ArticleDetails({ id }: { id: string }) {
  const { article } = useArticlesDetails(id)
  const { scrollToTop } = useGlobalScroll()

  const { likePost } = useLikeArticle(id)

  useLayoutEffect(() => {
    scrollToTop()
  }, [id])

  if (!article?.title) {
    return (
      <Container mr="5" ml="5">
        <ArticleSkeleton />
      </Container>
    );
  }

  return (
    <Section pb="0">
      <ArticleContent article={article} likePost={likePost} />

      <LikeAndComment
        likesCount={article.likesCount}
        likes={article.likedByUserIds}
        likePost={likePost}
      />

      <ArticleComments id={article.id} />

      <Box mt="7">
        <ArticleRandom id={id} />
      </Box>

    </Section>
  );
}
