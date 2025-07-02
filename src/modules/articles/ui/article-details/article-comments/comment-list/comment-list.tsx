import type { Comment } from '../../../../types';
import { getCommentAtctions } from '@modules/articles/model';
import { useAuth } from '@modules/auth';
import { Flex } from '@radix-ui/themes';
import { For } from '@shared/components';
import { useMemo } from 'react';
import { CommentItem } from '../comment/comment';

export function CommentList({ commentList }: { commentList: Comment[] | [] }) {
  const { user } = useAuth()

  const commentsActions = useMemo(() => {
    return getCommentAtctions(user, commentList)
  }, [user, commentList])

  return (
    <For each={commentList}>
      {(comment) => {
        return (
          <Flex key={comment.id} direction="column" mb="2">
            <CommentItem comment={comment} actions={commentsActions[comment.id]} />
          </Flex>
        )
      }}
    </For>
  )
}
