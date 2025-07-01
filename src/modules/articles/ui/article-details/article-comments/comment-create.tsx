import type { User } from '@kernel/types';
import { CommentAuthor } from '@modules/articles/ui/article-details/article-comments/comment-author';
import { Button, Flex } from '@radix-ui/themes';
import { TextArea } from '@radix-ui/themes/src/index.js';

export function CommentCreate({ user }: { user: User }) {
  return (
    <Flex direction="column" width="100%">
      <CommentAuthor author={user} createdAt={new Date()} />
      <TextArea mt="2" placeholder="What are you throughts?" />
      <Flex justify="end" align="center" mt="2">
        <Button>Respond</Button>
      </Flex>
    </Flex>
  )
}
