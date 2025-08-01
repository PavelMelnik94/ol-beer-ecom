import { getIsLiked, useGlobalScroll } from '@kernel/index';
import { useLikeArticle } from '@modules/articles/hooks/use-like-article';
import { Box, Container, Section } from '@radix-ui/themes';
import React, { useLayoutEffect } from 'react';
import { useArticlesDetails } from '../../hooks/use-article-details';
import { ArticleContent } from './article-content/article-content';
import { ArticleSkeleton } from './article-skeleton/article-skeleton';

const ArticleRandom = React.lazy(() => import('./article-random').then(module => ({ default: module.ArticleRandom })));

const LikeAndComment = React.lazy(() => import('../like-and-comment').then(module => ({ default: module.LikeAndComment })));

export function ArticleDetails({ id, commentSlot }: { id: string; commentSlot: React.ReactNode; }) {
  const { article } = useArticlesDetails(id);
  const { scrollToTop } = useGlobalScroll();

  const { likeArticle, isLiked, likeCounter } = useLikeArticle({
    initialIsLiked: getIsLiked(article?.likedByUserIds),
    initialLikesCount: article?.likesCount ?? 0,
  });

  useLayoutEffect(() => {
    scrollToTop();
  }, [id]);

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

      {commentSlot}

      <Box mt="7">
        <ArticleRandom excludeId={article.id} />
      </Box>

    </Section>
  );
}
