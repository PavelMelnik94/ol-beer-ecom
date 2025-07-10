import type { Comment, OptimisticComment } from '../types';
import { useAuthStore } from '@kernel/stores';
import { commentsModel } from '@modules/comments/model';
import { Flex } from '@radix-ui/themes';
import { For } from '@shared/components';
import { useMemo } from 'react';
import { CommentItem } from './comment/comment';

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
  const user = useAuthStore(s => s.user);

  const commentsActions = useMemo(() => {
    const actions = commentsModel.getCommentAllowActions(user, commentList as Comment[]);
    return actions;
  }, [user, commentList]);

  return (
    <For each={commentList}>
      {(comment, index) => {
        return (
          <Flex key={comment.id + index} direction="column" mb="2">
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
