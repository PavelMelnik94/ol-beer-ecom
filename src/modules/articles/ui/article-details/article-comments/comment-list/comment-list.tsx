import type { Comment, OptimisticComment } from '../../../../types';
import { getCommentAtctions as getCommentAllowActions } from '@modules/articles/model';
import { useAuth } from '@modules/auth';
import { Flex } from '@radix-ui/themes';
import { For } from '@shared/components';
import { useMemo } from 'react';
import { CommentItem } from '../comment/comment';

interface CommentListProps {
  commentList: Comment[] | OptimisticComment[];
  onUpdate?: (id: string, content: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onLike?: (id: string) => Promise<void>;
}

export function CommentList({
  commentList,
  onUpdate,
  onDelete,
  onLike,
}: CommentListProps) {
  const { user } = useAuth();

  const commentsActions = useMemo(() => {
    return getCommentAllowActions(user, commentList as Comment[]);
  }, [user, commentList]);

  return (
    <For each={commentList}>
      {(comment) => {
        return (
          <Flex key={comment.id} direction="column" mb="2">
            <CommentItem
              comment={comment}
              actions={commentsActions[comment.id]}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onLike={onLike}
            />
          </Flex>
        );
      }}
    </For>
  );
}
