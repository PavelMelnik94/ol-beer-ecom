import type { User } from '@kernel/types';
import type { Comment, CommentsActions } from '@modules/articles/types';
import { useAuthStore } from '@modules/auth/index';
import { z } from 'zod';

function getUserIsAuthor(user: User, commentAuthor: Comment['author']): boolean {
  return user?.id === commentAuthor?.id
}

function getCommentAtctions(user: User | null, Comments: Comment[]): CommentsActions {
  return Comments?.reduce((acc, comment) => {
    const isSelfComment = user ? getUserIsAuthor(user, comment.author) : false;

    return {
      ...acc,
      [comment.id]: {
        withDelete: isSelfComment,
        withEdit: isSelfComment,
        withLike: !isSelfComment,
      },
    } satisfies CommentsActions;
  }, {} as CommentsActions)
}

function getIsLiked(likeListForCheck: string[] | [] | undefined): boolean {
  const userId = useAuthStore.getState().user?.id
  if (z.string().safeParse(userId).success
    && Array.isArray(likeListForCheck)
    && z.array(z.string()).safeParse(likeListForCheck).success
  ) {
    return typeof userId && likeListForCheck.length > 0
      ? likeListForCheck.includes(userId as never)
      : false;
  }
  return false;
}

export { getCommentAtctions, getIsLiked };
