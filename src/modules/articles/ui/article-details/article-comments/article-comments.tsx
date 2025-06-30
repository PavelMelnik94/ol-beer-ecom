import { Avatar, Blockquote, Box, Button, Card, Flex, Section, Text, TextArea } from '@radix-ui/themes'
import { SquarePen } from 'lucide-react'
import { useCommentList } from '@modules/articles/hooks/use-comment-list';
import { Image } from '@shared/components';
import { LikesCounter } from '../../likes-counter/likes-counter'
import styles from './article-comments.module.css';

interface Props {
  id: string;
}

export function ArticleComments({ id }: Props) {
  const { commentList, isLoading } = useCommentList(id);

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
                user
                {' '}
                user
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
        commentList.map((comment) => {
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
                  <SquarePen color="gray" size={16} />
                  <LikesCounter likesCount={comment.likesCount} />
                </Flex>

              </Card>

            </Flex>
          )
        })
      }
    </>
  )
}
