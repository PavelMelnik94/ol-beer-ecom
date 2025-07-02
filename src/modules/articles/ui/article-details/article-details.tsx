import { useGlobalScroll } from '@kernel/index';
import { getIsLiked } from '@modules/articles/model';
import { useLikeArticle } from '@modules/articles/ui/article-details/hooks/use-like-article';
import { Box, Container, Section } from '@radix-ui/themes';
import { useLayoutEffect } from 'react';
import { LikeAndComment } from '../like-and-comment/like-and-comment';
import { ArticleComments } from './article-comments/article-comments-wrapper';
import { ArticleContent } from './article-content/article-content';
import { ArticleRandom } from './article-random';
import { ArticleSkeleton } from './article-skeleton/article-skeleton';
import { useArticlesDetails } from './hooks/use-article-details';

export function ArticleDetails({ id }: { id: string }) {
  const { article } = useArticlesDetails(id)
  const { scrollToTop } = useGlobalScroll()

  const { likeArticle, isLiked, likeCounter } = useLikeArticle({
    initialIsLiked: getIsLiked(article?.likedByUserIds),
    initialLikesCount: article?.likesCount ?? 0,
  })

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
      <ArticleContent article={article} likePost={likeArticle} isLiked={isLiked} likeCounter={likeCounter} />

      <LikeAndComment
        likesCount={likeCounter}
        isLiked={isLiked}
        likePost={likeArticle}
      />

      <ArticleComments />

      <Box mt="7">
        <ArticleRandom />
      </Box>

    </Section>
  );
}
