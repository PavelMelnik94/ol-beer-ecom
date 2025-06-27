import { Avatar, Blockquote, Box, Card, Flex, Heading, Section, Text } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { useGlobalScroll } from '@shared/hooks';
import { useLayoutEffect } from 'react';
import { SquarePen } from 'lucide-react';
import { useLikePost } from '../../hooks/use-like-post';
import { useArticlesDetails } from '../../hooks/use-article-details';
import { useCommentList } from '../../hooks/use-comment-list';
import { TagList } from './../tag-list/tag-list';
import styles from './article-details.module.scss';
import { LikesCounter } from './../likes-counter/likes-counter';

export function ArticleDetails({ id }: { id: string }) {
  const { article, isLoading } = useArticlesDetails(id)
  const { scrollToTop } = useGlobalScroll();
  const { likePost } = useLikePost(id)
  const { commentList } = useCommentList(id);

  useLayoutEffect(() => {
    scrollToTop();
  }, []);

  if (isLoading || !article?.title || !commentList) {
    return <Section>Loading...</Section>;
  }

  console.log(commentList, 'commentList')

  console.log(article, 'article')
  return (
    <Section>
      <Heading size="9" mb="4" className="playfair-bold">
        {article.title}
      </Heading>

      <Flex direction="row" justify="start" align="center" gap="4" mb="4">
        <Text size="2" color="gray">
          {new Date(article.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
        <LikesCounter likesCount={article.likesCount} onClick={likePost} />
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

      <Flex justify="between" align="end" mb="6" wrap="wrap" gap="4">
        <Flex gap="3" align="center">
          <Avatar
            size="3"
            src={article.author.avatar}
            radius="full"
            fallback="T"
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              {article.author.firstName}
              {' '}
              {article.author.lastName}
            </Text>
            <Text as="div" size="2" color="gray">
              Writer, Brewster
            </Text>
          </Box>

        </Flex>

        <Flex gap="2">
          <TagList tags={article.tags} />

        </Flex>

      </Flex>

      <Flex direction="row" justify="start" align="center" gap="1" mb="4" wrap="wrap">
        <Text size="2" color="gray">
          Support the article with a like
        </Text>
        <LikesCounter likesCount={article.likesCount} onClick={likePost} />
        <Text size="2" color="gray">
          and a comment
        </Text>
      </Flex>

      {commentList.map((comment) => {
        return (
          <Flex key={comment.id} direction="column" mb="2">
            <Card>
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src={comment.author.avatar}
                  radius="full"
                  fallback="T"
                />
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {comment.author.firstName}
                    {' '}
                    {comment.author.lastName}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Text>
                </Box>
              </Flex>

              <Blockquote size="2" mt="2">
                {comment.content}
              </Blockquote>

              <Flex className={styles.commentActions} align="center" gap="2">
                <SquarePen color="gray" size={16} />
                <LikesCounter likesCount={comment.likesCount} />
              </Flex>

            </Card>

          </Flex>
        )
      })}

    </Section>
  );
}
