import type { User } from '@kernel/types';
import type { Comment } from '@modules/articles/types';
import { Avatar, Box, Flex, Text } from '@radix-ui/themes';

export function CommentAuthor({
  author,
  createdAt,
}: {
  author: Comment['author'] | User,
  createdAt: Date
}) {
  const createdAtDate = (() => {
    return createdAt.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  })()

  return (
    <Flex gap="3" align="center">
      <Avatar
        size="3"
        src={author?.avatar || undefined}
        radius="full"
        fallback="ØL"
      />
      <Box>
        <Text as="div" size="2" weight="bold">
          {author?.firstName || 'Guest'}
          {' '}
          {author?.lastName || ''}
        </Text>
        <Text as="div" size="1" color="gray">
          {createdAtDate}
        </Text>
      </Box>
    </Flex>
  )
}
