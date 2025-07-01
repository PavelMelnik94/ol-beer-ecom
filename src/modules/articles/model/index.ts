import type { User } from '@kernel/types'
import type { Comment, CommentsActions } from '@modules/articles/types'
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

function getIsLiked({ likes, userId }: { likes: string[]; userId: string | null | undefined }): boolean {
  if (z.string().safeParse(userId).success && z.array(z.string()).safeParse(likes).success) {
    return typeof userId && likes.length > 0
      ? likes.includes(userId as never)
      : false;
  }
  return false;
}

export { getCommentAtctions, getIsLiked }
