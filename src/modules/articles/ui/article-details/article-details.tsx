import { Box, Container, Section } from '@radix-ui/themes';
import { useConfetti } from '@shared/hooks/use-confetti';
import { useIntersectionObserver } from '@shared/hooks';
import { useLikePost } from '@modules/articles/hooks/use-like-post';
import { useArticlesDetails } from '../../hooks/use-article-details';
import { LikeAndComment } from '../like-and-comment/like-and-comment';
import { ArticleComments } from './article-comments/article-comments';
import { ArticleRandom } from './article-random';
import { ArticleContent } from './article-content';
import { ArticleSkeleton } from './article-skeleton/article-skeleton';

export function ArticleDetails({ id }: { id: string }) {
  const { article } = useArticlesDetails(id)

  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
  })
  const { likePost } = useLikePost(id)

  useConfetti({ playWhen: isIntersecting, depends: [id] })

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

      <Container pr="5" pl="5">
        <LikeAndComment likesCount={article.likesCount} likePost={likePost} />
      </Container>

      <Container ref={ref} pr="5" pl="5">
        <ArticleComments id={article.id} />
      </Container>

      <Box mt="7">
        <ArticleRandom id={id} />
      </Box>

    </Section>
  );
}
