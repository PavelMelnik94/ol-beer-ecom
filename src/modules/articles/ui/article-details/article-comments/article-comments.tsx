import { Avatar, Box, Button, Container, Flex, Text, TextArea } from '@radix-ui/themes'
import { useCommentList } from '@modules/articles/hooks/use-comment-list';
import { useAuth } from '@modules/auth';
import { CommentList } from '@modules/articles/ui/article-details/article-comments/comment-list/comment-list';
import { useMemo } from 'react';
import { getCommentAtctions } from '@modules/articles/model';

interface Props {
  id: string;
}

export function ArticleComments({ id }: Props) {
  const { commentList } = useCommentList(id);
  const { user } = useAuth()

  const commentsActions = useMemo(() => {
    return getCommentAtctions(user, commentList)
  }, [id, user, commentList])

  return (
    <Container pr="5" pl="5">
      {/* TODO #2 new comment block */}
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

      <CommentList commentList={commentList} commentsActions={commentsActions} />
    </Container>
  )
}
