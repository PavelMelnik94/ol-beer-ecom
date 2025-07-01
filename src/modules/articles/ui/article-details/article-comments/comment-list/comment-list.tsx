import { Blockquote, Box, Card, Flex, Text } from '@radix-ui/themes'
import { For } from '@shared/components'
import { CommentAuthor } from '@modules/articles/ui/article-details/article-comments/comment-author'
import type { Comment, CommentsActions } from '../../../../types'
import { LikesCounterWithAuthorizePopup } from '../../../likes-counter/likes-counter-with-auth-popup'
import styles from './comment-list.module.css';

export function CommentList({ commentList, commentsActions }: { commentList: Comment[] | [], commentsActions: CommentsActions }) {
  return (
    <For each={commentList}>
      {(comment) => {
        const { withDelete, withEdit, withLike } = commentsActions[comment.id]

        return (
          <Flex key={comment.id} direction="column" mb="2">
            <Card>
              <CommentAuthor author={comment.author} createdAt={comment.createdAt} />

              <Blockquote size="2" mt="2">
                {comment.content}
              </Blockquote>

              <Box className={styles.likeBlock}>
                {withLike && <LikesCounterWithAuthorizePopup likesCount={comment.likesCount} />}
              </Box>

              <Flex className={styles.actions} justify="end" gap="4" mt="2">
                {withDelete && <Text size="2" className="pointer" color="blue">Edit</Text>}
                {withEdit && <Text size="2" className="pointer" color="ruby">Delete</Text>}
              </Flex>
            </Card>

          </Flex>
        )
      }}
    </For>
  )
}
