import { Flex } from '@radix-ui/themes';
import { For } from '@shared/components';
import type { Comment, CommentsActions } from '../../../../types';
import { CommentItem } from '../comment/comment';

export function CommentList({ commentList, commentsActions }: { commentList: Comment[] | [], commentsActions: CommentsActions }) {
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
