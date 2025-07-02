import type { Comment, CommentsActions } from '@modules/articles/types';
import { LikesCounterWithAuthorizePopup } from '@modules/articles/ui/likes-counter/likes-counter-with-auth-popup';
import { Blockquote, Box, Button, Card, Flex, TextArea } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { CommentActions } from './comment-actions';
import { CommentAuthor } from './comment-author';
import styles from './comment-list.module.scss';
import { useCommentDelete } from './hooks/use-comment-delete';
import { useCommentEdit } from './hooks/use-comment-edit';
import { useCommentLike } from './hooks/use-comment-like';

export function CommentItem({ comment, actions }: { comment: Comment, actions: CommentsActions[0] }) {
  const {
    updateComment,

    setUpdatedValue,
    updatedValue,

    isUpdating,
    isValidValue: isValid,

    mode,
    toggleMode,
  } = useCommentEdit(comment);

  const { likeComment, isLiked, likeCounter } = useCommentLike(comment)
  const { deleteComment } = useCommentDelete(comment)

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
        {actions.withLike && <LikesCounterWithAuthorizePopup isLiked={isLiked} likesCount={likeCounter} onClick={() => likeComment()} />}
      </Box>

      <CommentActions
        editLabel={mode === 'edit' ? 'Calcel' : 'Edit'}

        withDelete={actions.withDelete}
        onDelete={deleteComment}

        withEdit={actions.withEdit}
        onEdit={() => toggleMode()}
      />
    </Card>
  )
}
