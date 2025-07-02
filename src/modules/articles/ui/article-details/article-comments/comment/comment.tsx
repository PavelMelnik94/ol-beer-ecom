import type { Comment, CommentsActions, OptimisticComment } from '@modules/articles/types';
import { getIsLiked } from '@modules/articles/model';
import { LikesCounterWithAuthorizePopup } from '@modules/articles/ui/likes-counter/likes-counter-with-auth-popup';
import { Blockquote, Box, Button, Card, Flex, TextArea } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { useState } from 'react';
import { CommentActions } from './comment-actions';
import { CommentAuthor } from './comment-author';
import styles from './comment-list.module.scss';

interface CommentItemProps {
  comment: Comment | OptimisticComment;
  actions: CommentsActions[0];
  onUpdate?: (id: string, content: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onLike?: (id: string) => Promise<void>;
}

export function CommentItem({
  comment,
  actions,
  onUpdate,
  onDelete,
  onLike,
}: CommentItemProps) {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [editContent, setEditContent] = useState(comment.content);
  const [isInternalUpdating, setIsInternalUpdating] = useState(false);

  const isOptimistic = 'isOptimistic' in comment && comment.isOptimistic;
  const isPending = 'isPending' in comment && comment.isPending;

  const isValid = editContent.trim().length > 5;
  const isUpdating = isInternalUpdating || isPending || isOptimistic;

  const handleUpdate = async () => {
    if (!isValid || isUpdating) return;

    setIsInternalUpdating(true);
    try {
      if (onUpdate) await onUpdate(comment.id, editContent.trim());

      setMode('view');
    }
    catch (error) {
      console.error('Error updating comment:', error);
    }
    finally {
      setIsInternalUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (onDelete) await onDelete(comment.id);
    }
    catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleLike = async () => {
    try {
      if (onLike) await onLike(comment.id);
    }
    catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const toggleMode = () => {
    if (mode === 'edit') {
      setEditContent(comment.content);
      setMode('view');
    }
    else {
      setMode('edit');
    }
  };

  const backgroundColor = (() => {
    if ((isPending && !isOptimistic && mode === 'edit') || isOptimistic) {
      return '#dcfce7';
    }

    return undefined;
  })()

  return (
    <Card
      style={{
        opacity: isPending ? 0.7 : 1,
        backgroundColor,
      }}
    >
      <CommentAuthor author={comment.author} createdAt={new Date(comment.createdAt)} />

      <Blockquote size="2" mt="2">
        {comment.content}
      </Blockquote>

      <Show when={mode === 'edit'}>
        <Box mb="5" mt="3">
          <TextArea
            disabled={isUpdating}
            placeholder="What are your thoughts?"
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
          />
          <Flex justify="end" align="center" mt="2">
            <Button
              disabled={!isValid || isUpdating}
              loading={isUpdating}
              onClick={handleUpdate}
            >
              Save
            </Button>
          </Flex>
        </Box>
      </Show>

      <Box className={styles.likeBlock}>
        {actions.withLike && (
          <LikesCounterWithAuthorizePopup
            isLiked={getIsLiked(comment.likedByUserIds)}
            likesCount={comment.likesCount}
            onClick={handleLike}
          />
        )}
      </Box>

      <Show when={!isUpdating}>
        <CommentActions
          editLabel={mode === 'edit' ? 'Cancel' : 'Edit'}

          withDelete={actions.withDelete}
          onDelete={handleDelete}

          withEdit={actions.withEdit}
          onEdit={toggleMode}
        />
      </Show>

    </Card>
  );
}
