import { useCommentActions } from '@modules/articles/hooks/use-comment-actions';
import type { Comment, CommentsActions } from '@modules/articles/types';
import { LikesCounterWithAuthorizePopup } from '@modules/articles/ui/likes-counter/likes-counter-with-auth-popup';
import { Blockquote, Box, Button, Card, Flex, TextArea } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { CommentActions } from '../comment-actions';
import { CommentAuthor } from '../comment-author';
import styles from './comment-list.module.scss';

export function CommentItem({ comment, actions, id }: { comment: Comment, actions: CommentsActions[0], id: string }) {
  const {
    updateComment,
    deleteComment,

    setUpdatedValue,
    updatedValue,

    isUpdating,
    isValidValue: isValid,

    mode,
    toggleMode,
  } = useCommentActions(comment, id);

  return (
    <Card>
      <CommentAuthor author={comment.author} createdAt={new Date(comment.createdAt)} />

      <Blockquote size="2" mt="2">
        {comment.content}
      </Blockquote>

      <Show when={mode === 'edit'}>
        <Box mb="5" mt="3">
          <TextArea
            disabled={isUpdating}
            placeholder="What are you throughts?"
            value={updatedValue}
            onChange={e => setUpdatedValue(e.target.value)}
          />
          <Flex justify="end" align="center" mt="2">
            <Button disabled={!isValid || isUpdating} loading={isUpdating} onClick={updateComment}>Respond</Button>
          </Flex>
        </Box>
      </Show>

      <Box className={styles.likeBlock}>
        {actions.withLike && <LikesCounterWithAuthorizePopup likesCount={comment.likesCount} />}
      </Box>

      <CommentActions
        editLabel={mode === 'edit' ? 'Calcel' : 'Edit'}

        withDelete={actions.withDelete}
        onDelete={deleteComment}

        withEdit={actions.withEdit}
        onEdit={toggleMode}
      />
    </Card>
  )
}
