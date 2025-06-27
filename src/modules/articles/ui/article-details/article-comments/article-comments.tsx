import { Avatar, Blockquote, Box, Card, Flex, Section, Text } from '@radix-ui/themes'
import { SquarePen } from 'lucide-react'
import { useCommentList } from '@modules/articles/hooks/use-comment-list';
import { LikesCounter } from '../../likes-counter/likes-counter'
import { LikesCounterWithAuthorizePopup } from '../../likes-counter/likes-counter-with-auth-popup';
import styles from './article-comments.module.css';

interface Props {
  id: string;
}

export function ArticleComments({ id }: Props) {
  const { commentList, isLoading } = useCommentList(id);

  console.log(commentList, 'commentList')

  if (isLoading || !Array.isArray(commentList)) {
    return <Section>Loading...</Section>;
  }

  return commentList.map((comment) => {
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
            <LikesCounterWithAuthorizePopup likesCount={comment.likesCount} />
          </Flex>

        </Card>

      </Flex>
    )
  })
}
