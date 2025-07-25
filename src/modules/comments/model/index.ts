import type { Author, User } from '@kernel/types';
import type { Comment, CommentsActions, OptimisticComment } from '../types';
import { normalizeAvatarUrl } from '@kernel/utils';
import { generateRandomId } from '@shared/utils';

function createOptimisticComment(content: string, user: Author | User): OptimisticComment {
  const optimisticId = generateRandomId();
  return {
    id: optimisticId,
    content: content.trim(),
    author: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar || '',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likesCount: 0,
    likedByUserIds: [],
    isOptimistic: true,
    isPending: false,
  };
}

function normalizeComments(comments: Comment[]): Comment[] {
  return comments.map(comment => ({
    ...comment,
    author: {
      ...comment.author,
      ...(comment.author.avatar ? { avatar: normalizeAvatarUrl(comment.author.avatar) } : {}),
    },
  }));
}

function optimisticUpdateComment(comments: OptimisticComment[], id: string, content: string) {
  return comments.map(comment =>
    comment.id === id
      ? { ...comment, content: content.trim(), isPending: true }
      : comment,
  );
}

function optimisticDeleteComment(comments: OptimisticComment[], id: string) {
  return comments.filter(comment => comment.id !== id);
}

function optimisticLikeComment(comments: OptimisticComment[], id: string, userId: string) {
  return comments.map((comment) => {
    if (comment.id === id) {
      const isLiked = (comment.likedByUserIds as string[]).includes(userId);
      return {
        ...comment,
        likesCount: isLiked ? comment.likesCount - 1 : comment.likesCount + 1,
        likedByUserIds: isLiked
          ? (comment.likedByUserIds as string[]).filter(uid => uid !== userId)
          : [...(comment.likedByUserIds as string[]), userId],
        isPending: false,
      };
    }
    return comment;
  });
}

function mapServerCommentsToOptimistic(data: Comment[]): OptimisticComment[] {
  return data.map(comment => ({
    ...comment,
    isOptimistic: false,
  }));
}

function shouldGoToPreviousPage(currentData: Comment[] | undefined, optimisticCount: number, page: number, isLoading: boolean) {
  return (currentData?.length === 0 || optimisticCount === 0) && page > 1 && !isLoading;
}

function getUserIsAuthor(user: User, commentAuthor: Comment['author']): boolean {
  return user?.id === commentAuthor?.id;
}

function getCommentAllowActions(user: User | null, Comments: Comment[]): CommentsActions {
  return Comments.reduce((accumulator, comment) => {
    const isSelfComment = user ? getUserIsAuthor(user, comment.author) : false;

    return {
      ...accumulator,
      [comment.id]: {
        withDelete: isSelfComment,
        withEdit: isSelfComment,
        withLike: !isSelfComment,
      },
    } satisfies CommentsActions;
  }, {});
}

export const commentsModel = {
  createOptimisticComment,
  optimisticUpdateComment,
  optimisticDeleteComment,
  optimisticLikeComment,
  mapServerCommentsToOptimistic,
  shouldGoToPrevPage: shouldGoToPreviousPage,
  getCommentAllowActions,
  normalizeComments,
};
