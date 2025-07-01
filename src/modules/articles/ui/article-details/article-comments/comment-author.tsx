import type { Comment } from '@modules/articles/types';
import { Avatar, Box, Flex, Text } from '@radix-ui/themes';

export function CommentAuthor({
  author,
  createdAt,
}: {
  author: Comment['author'],
  createdAt?: Comment['createdAt']
}) {
  const createdAtDate = (() => {
    const date = createdAt ? new Date(createdAt) : new Date();

    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  })()

  return (
    <Flex gap="3" align="center">
      <Avatar
        size="3"
        src={author.avatar}
        radius="full"
        fallback="T"
      />
      <Box>
        <Text as="div" size="2" weight="bold">
          {author.firstName}
          {' '}
          {author.lastName}
        </Text>
        <Text as="div" size="1" color="gray">
          {createdAtDate}
        </Text>
      </Box>
    </Flex>
  )
}
