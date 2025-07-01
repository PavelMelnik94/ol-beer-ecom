import { useCommentList } from '@modules/articles/hooks/use-comment-list';
import { getCommentAtctions } from '@modules/articles/model';
import { CommentList } from '@modules/articles/ui/article-details/article-comments/comment-list/comment-list';
import { CommentCreate } from '@modules/articles/ui/article-details/article-comments/comment/comment-create';
import { useAuth } from '@modules/auth';
import { Box, Container, Flex, Separator } from '@radix-ui/themes';
import { Pagination, Show } from '@shared/components';
import { useMemo } from 'react';

export function ArticleComments() {
  const { commentList, onChangePage, currentPage, totalPages } = useCommentList();
  const { user, isAuth } = useAuth()

  const commentsActions = useMemo(() => {
    return getCommentAtctions(user, commentList)
  }, [user, commentList])

  return (
    <Container pr="5" pl="5">
      <Box mb="6">
        {isAuth && !!user && <CommentCreate user={user} /> }
      </Box>

      <CommentList commentList={commentList} commentsActions={commentsActions} />
      <Show when={totalPages && totalPages > 1}>
        <Flex justify="end" align="center">
          <Pagination page={Number(currentPage)} total={Number(totalPages)} onPageChange={p => onChangePage(p)} />
        </Flex>
      </Show>

      <Separator size="4" mt="4" />
    </Container>
  )
}
