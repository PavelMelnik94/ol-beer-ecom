import { QUERY_KEYS } from '@kernel/query';
import { ArticleDetails } from '@modules/articles';
import { commentsArticleApi, useComments } from '@modules/comments';
import { Pagination } from '@shared/components';
import React from 'react';
import { useParams } from 'react-router-dom';

const { usePagination: useCommentPagination } = Pagination;

const Comments = React.lazy(() => import('@modules/comments').then(module => ({ default: module.Comments })));
export function ArticlePage() {
  const { id } = useParams();

  const { page: commentPage, isPageChanging, handlePageChange } = useCommentPagination();

  const {
    comments,
    pagination,
    isLoading,
    isCreating,
    createComment,
    updateComment,
    deleteComment,
    likeComment,
    error,
  } = useComments({
    page: commentPage,
    parentId: String(id),
    api: commentsArticleApi,
    queryKey: QUERY_KEYS.articles.commentList(String(id), commentPage),
  });

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

  return (
    <ArticleDetails
      id={String(id)}
      commentSlot={(
        <Comments
          comments={comments}
          error={error}

          pagination={pagination}
          onPageChange={handlePageChange}

          onCreateComment={handleCreateComment}
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
          onLikeComment={handleLikeComment}

          isLoading={isLoading}
          isCreating={isCreating}
          isPageChanging={isPageChanging}
        />
      )}
    />
  );
}
