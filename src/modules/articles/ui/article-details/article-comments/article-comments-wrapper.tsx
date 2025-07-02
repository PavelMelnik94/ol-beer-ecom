import { useAuthStore } from '@kernel/stores';

import { Box, Container, Flex, Separator } from '@radix-ui/themes';
import { ErrorAlert, Pagination, Show, SuccessAlert } from '@shared/components';
import { parseAsInteger, useQueryState } from 'nuqs';

import { useEffect, useState } from 'react';
import { useComments } from '../../../hooks/use-comments';
import { CommentList } from './comment-list/comment-list';
import { CommentCreate } from './comment/comment-create';

export function ArticleComments() {
  const user = useAuthStore(s => s.user);
  const [page = 1, setPage] = useQueryState('commentPage', parseAsInteger);
  const [isPageChanging, setIsPageChanging] = useState(false);

  const {
    comments,
    pagination,
    isLoading,
    isCreating,
    createComment,
    updateComment,
    deleteComment,
    likeComment,
    shouldGoToPrevPage,
    error,
  } = useComments({ page: page || 1 });

  useEffect(() => {
    if (shouldGoToPrevPage && (page || 1) > 1) {
      setPage((page || 1) - 1);
    }
  }, [shouldGoToPrevPage, page, setPage]);

  const handlePageChange = (newPage: number) => {
    setIsPageChanging(true);
    setPage(newPage);
  };

  useEffect(() => {
    if (!isLoading && isPageChanging) {
      setIsPageChanging(false);
    }
  }, [isLoading, isPageChanging]);

  const handleCreateComment = async (content: string) => {
    await createComment(content);
  };

  const handleUpdateComment = async (id: string, content: string) => {
    await updateComment(id, content);
  };

  const handleDeleteComment = async (id: string) => {
    await deleteComment(id);
  };

  const handleLikeComment = async (id: string) => {
    await likeComment(id);
  };

  if (error) {
    return (
      <Container pr="5" pl="5">
        <Box mb="6" style={{ color: 'red' }}>
          <ErrorAlert>
            {error.message || 'Error loading comments. Please try again later.'}
          </ErrorAlert>
        </Box>
      </Container>
    );
  }

  return (
    <Container pr="5" pl="5">
      <Box mb="6">
        {!!user && (
          <CommentCreate
            user={user}
            onCreateComment={handleCreateComment}
            isLoading={isCreating}
          />
        )}
      </Box>

      <CommentList
        commentList={comments}
        onUpdate={handleUpdateComment}
        onDelete={handleDeleteComment}
        onLike={handleLikeComment}
      />

      <Show when={pagination.totalPages > 1}>
        {(isPageChanging || isLoading) && (
          <Box mb="4" style={{ textAlign: 'center' }}>
            <SuccessAlert>
              Loading page
            </SuccessAlert>
          </Box>
        )}
        <Flex justify="end" align="center">
          <Pagination
            page={pagination.page}
            total={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </Flex>
      </Show>

      <Separator size="4" mt="4" />
    </Container>
  );
}
