import { Flex } from '@radix-ui/themes';
import { For } from '@shared/components';
import type { Comment, CommentsActions } from '../../../../types';
import { CommentItem } from '../comment/comment';

export function CommentList({ commentList, commentsActions, id }: { commentList: Comment[] | [], commentsActions: CommentsActions, id: string }) {
  return (
    <For each={commentList}>
      {(comment) => {
        return (
          <Flex key={comment.id} direction="column" mb="2">
            <CommentItem comment={comment} actions={commentsActions[comment.id]} id={id} />
          </Flex>
        )
      }}
    </For>
  )
}
