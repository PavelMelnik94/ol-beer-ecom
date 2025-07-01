import type { User } from '@kernel/types'
import type { Comment, CommentsActions } from '@modules/articles/types'

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
        withLike: true,
      },
    } satisfies CommentsActions;
  }, {} as CommentsActions)
}

export { getCommentAtctions }
