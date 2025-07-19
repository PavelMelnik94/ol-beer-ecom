import type { ApiErrorResponse } from '@kernel/api';
import type { Comment, OptimisticComment } from '../types';
import { useUserStore } from '@kernel/stores';
import { Box, Container, Flex, Separator } from '@radix-ui/themes';
import { ErrorAlert, Pagination, Show, SuccessAlert } from '@shared/components';
import { CommentList } from './comment-list';
import { CommentCreate } from './comment/comment-create';

interface CommentsProperties {
  comments: Comment[] | OptimisticComment[];
  error: ApiErrorResponse | null;
  pagination: {
    page: number;
    totalPages: number;
  };

  onCreateComment: (content: string) => Promise<void>;
  onUpdateComment: (id: string, content: string) => Promise<void>;
  onDeleteComment: (id: string) => Promise<void>;
  onLikeComment: (id: string) => Promise<void>;
  onPageChange: (page: number) => void;

  isLoading?: boolean;
  isCreating?: boolean;
  isPageChanging?: boolean;
}
export function Comments({
  comments,
  error,
  isLoading,
  isCreating,
  isPageChanging,
  pagination,
  onCreateComment,
  onUpdateComment,
  onDeleteComment,
  onLikeComment,
  onPageChange,
}: CommentsProperties) {
  const user = useUserStore(s => s.profile);

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
            onCreateComment={onCreateComment}
            isLoading={isCreating}
          />
        )}
      </Box>

      <CommentList
        commentList={comments}
        onUpdate={onUpdateComment}
        onDelete={onDeleteComment}
        onLike={onLikeComment}
      />

      <Show when={pagination.totalPages > 1}>
        {(isPageChanging ?? isLoading) && (
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
            onPageChange={onPageChange}
          />
        </Flex>
      </Show>

      <Separator size="4" mt="4" />
    </Container>
  );
}
