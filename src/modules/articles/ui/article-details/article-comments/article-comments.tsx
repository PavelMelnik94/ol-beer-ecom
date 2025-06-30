import { Avatar, Blockquote, Box, Button, Card, Flex, Section, Text, TextArea } from '@radix-ui/themes'
import { SquarePen, Trash2 } from 'lucide-react'
import { useCommentList } from '@modules/articles/hooks/use-comment-list';
import { LikesCounterWithAuthorizePopup } from '@modules/articles/ui/likes-counter/likes-counter-with-auth-popup';
import { useAuth } from '@modules/auth';
import { Show } from '@shared/components';
import type { Comment } from '@modules/articles/types';
import styles from './article-comments.module.css';

interface Props {
  id: string;

}

export function ArticleComments({ id }: Props) {
  const { commentList, isLoading } = useCommentList(id);
  const { user } = useAuth()

  if (isLoading || !Array.isArray(commentList)) {
    return <Section>Loading...</Section>;
  }

  return (
    <>
      {/* TODO #2 comment block */}
      <Box mb="6">

        <Flex direction="column" width="100%">
          <Flex gap="3" mb="2" align="center">
            <Avatar
              size="3"
              src={undefined}
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                {user?.firstName}
                {' '}
                {user?.lastName}
              </Text>
              <Text as="div" size="1" color="gray">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
            </Box>
          </Flex>
          <TextArea placeholder="What are you throughts?" />
          <Flex justify="end" align="center" mt="2">
            <Button>Respond</Button>
          </Flex>
        </Flex>

      </Box>
      {
        // todo #1 - For
        commentList.map((comment: Comment) => {
          const isSelfComment = user?.id === comment.author.id
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
                    <Text as="div" size="1" color="gray">
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
                  <Show when={isSelfComment}>
                    <Trash2 color="gray" size={16} />
                    <SquarePen color="gray" size={16} />
                  </Show>

                  <Show when={!isSelfComment}>
                    <LikesCounterWithAuthorizePopup likesCount={comment.likesCount} />
                  </Show>
                </Flex>

              </Card>

            </Flex>
          )
        })
      }
    </>
  )
}
