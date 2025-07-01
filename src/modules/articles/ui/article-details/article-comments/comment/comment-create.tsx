import type { User } from '@kernel/types';
import { CommentAuthor } from '@modules/articles/ui/article-details/article-comments/comment/comment-author';
import { Button, Flex } from '@radix-ui/themes';
import { TextArea } from '@radix-ui/themes/src/index.js';
import { useCommentCreate } from './hooks/use-comment-create';

export function CommentCreate({ user }: { user: User }) {
  const { value, handleChangeComment, handleSubmitComment, isValid, isLoading } = useCommentCreate()

  return (
    <Flex direction="column" width="100%">
      <CommentAuthor author={user} createdAt={new Date()} />
      <TextArea disabled={isLoading} mt="2" placeholder="What are you throughts?" value={value} onChange={handleChangeComment} />
      <Flex justify="end" align="center" mt="2">
        <Button disabled={!isValid || isLoading} loading={isLoading} onClick={handleSubmitComment}>Respond</Button>
      </Flex>
    </Flex>
  )
}
