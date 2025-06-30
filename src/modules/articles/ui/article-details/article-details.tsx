import { Container, Flex, Heading, Section, Separator, Text } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { useGlobalScroll } from '@kernel/hooks';
import { useLayoutEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLikePost } from '../../hooks/use-like-post';
import { useArticlesDetails } from '../../hooks/use-article-details';
import { LikesCounterWithAuthorizePopup } from '../likes-counter/likes-counter-with-auth-popup';
import { LikeAndComment } from '../like-and-comment/like-and-comment';
import { ArticleSkeleton } from './article-skeleton/article-skeleton';
import styles from './article-details.module.scss';
import { ArticleMeta } from './article-meta';
import { ArticleComments } from './article-comments/article-comments';

export function ArticleDetails({ id }: { id: string }) {
  const { article, isLoading } = useArticlesDetails(id)
  const { scrollToTop } = useGlobalScroll();
  const { likePost } = useLikePost(id)
  const isMobile = useMediaQuery({
    query: '(max-width: 576px)',
  })

  useLayoutEffect(() => {
    scrollToTop();
  }, []);

  if (isLoading || !article?.title) {
    return (
      <Container mr="5" ml="5">
        <ArticleSkeleton />
      </Container>
    );
  }

  return (
    <Section pb="0">
      <Container pr="5" pl="5">

        <Flex mt={isMobile ? '-7' : '9'}>
          <Heading size="9" mb="4" className="playfair-bold" wrap="wrap">
            {article.title}
          </Heading>
        </Flex>

        <Flex direction="row" justify="start" align="center" gap="4" mb="4">
          <Text size="2" color="gray">
            {new Date(article.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>

          <LikesCounterWithAuthorizePopup likesCount={article.likesCount} onClick={likePost} />
        </Flex>

        <Heading size="5" mb="6" wrap="pretty">
          {article.shortDescription}
        </Heading>
        <Image
          alt="image"
          src={article.image}
          containerClassName={styles.imageContainer}
        />

        <Text size="5" mt="4" mb="9" as="p">
          {article.longDescription}
        </Text>

        <ArticleMeta author={article.author} tags={article.tags} />
      </Container>
      <Separator size="4" mb="4" />

      <Container pr="5" pl="5">
        <LikeAndComment likesCount={article.likesCount} likePost={likePost} />

        <ArticleComments id={article.id} />
      </Container>

    </Section>
  );
}
