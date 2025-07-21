import type { ArticleDetails } from '@modules/articles/types';
import { LikesCounterWithAuthorizePopup } from '@modules/common';
import { Container, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import { Image } from '@shared/components';

import styles from './article-content.module.scss';
import { ArticleMeta } from './article-meta';
import { useMediaQuery } from '@shared/hooks';

export function ArticleContent({
  article,
  likePost,
  isLiked,
  likeCounter,
}: {
  article: ArticleDetails;
  likePost: () => void;
  isLiked: boolean;
  likeCounter: number;
}) {
  const isMobile = useMediaQuery('(max-width: 576px)');

  return (
    <>
      <Container pr="5" pl="5">
        <Flex mt={isMobile ? '-7' : '9'}>
          <Heading size={isMobile ? '7' : '9'} mb="4" className="playfair-bold" wrap="wrap">
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

          <LikesCounterWithAuthorizePopup likesCount={likeCounter} onClick={likePost} isLiked={isLiked} />
        </Flex>

        <Heading size={isMobile ? '4' : '5'} mb="6" wrap="pretty">
          {article.shortDescription}
        </Heading>
        <Image
          alt="image"
          src={article.image}
          containerClassName={styles.imageContainer}
          skeletonStyle={{
            minWidth: '100%',
            minHeight: '400px',
          }}
        />

        <Text size={isMobile ? '3' : '5'} mt="4" mb="9" as="p">
          {article.longDescription}
        </Text>

        <ArticleMeta author={article.author} tags={article.tags} />
      </Container>
      <Separator size="4" mb="4" />
    </>
  );
}
