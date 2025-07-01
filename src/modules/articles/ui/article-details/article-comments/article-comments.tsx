import { Box, Container } from '@radix-ui/themes'
import { useCommentList } from '@modules/articles/hooks/use-comment-list';
import { useAuth } from '@modules/auth';
import { CommentList } from '@modules/articles/ui/article-details/article-comments/comment-list/comment-list';
import { useMemo } from 'react';
import { getCommentAtctions } from '@modules/articles/model';
import { CommentCreate } from '@modules/articles/ui/article-details/article-comments/comment-create';

interface Props {
  id: string;
}

export function ArticleComments({ id }: Props) {
  const { commentList } = useCommentList(id);
  const { user, isAuth } = useAuth()

  const commentsActions = useMemo(() => {
    return getCommentAtctions(user, commentList)
  }, [id, user, commentList])

  return (
    <Container pr="5" pl="5">
      <Box mb="6">
        {isAuth && !!user && <CommentCreate user={user} /> }
      </Box>

      <CommentList commentList={commentList} commentsActions={commentsActions} />
    </Container>
  )
}
