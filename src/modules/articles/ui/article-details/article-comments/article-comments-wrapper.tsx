import { CommentList } from '@modules/articles/ui/article-details/article-comments/comment-list/comment-list';
import { CommentCreate } from '@modules/articles/ui/article-details/article-comments/comment/comment-create';
import { useAuth } from '@modules/auth';
import { Box, Container, Flex, Separator } from '@radix-ui/themes';
import { Pagination, Show } from '@shared/components';
import { useCommentList } from './comment-list/use-comment-list';

export function ArticleComments() {
  const { commentList, onChangePage, currentPage, totalPages } = useCommentList();
  const { user } = useAuth()

  return (
    <Container pr="5" pl="5">
      <Box mb="6">
        {!!user && <CommentCreate user={user} /> }
      </Box>

      <CommentList commentList={commentList} />
      <Show when={totalPages && totalPages > 1}>
        <Flex justify="end" align="center">
          <Pagination page={Number(currentPage)} total={Number(totalPages)} onPageChange={p => onChangePage(p)} />
        </Flex>
      </Show>

      <Separator size="4" mt="4" />
    </Container>
  )
}
