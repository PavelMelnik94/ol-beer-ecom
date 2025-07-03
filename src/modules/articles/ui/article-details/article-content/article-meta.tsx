import type { Article } from '../../../types';
import { Avatar, Box, Flex, Text } from '@radix-ui/themes';
import { TagList } from '../../tag-list';

interface Props {
  author: Article['author'];
  tags: Article['tags'];
}
export function ArticleMeta({ author, tags }: Props) {
  return (
    <Flex justify="between" align="end" mb="6" wrap="wrap" gap="4">
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
          <Text as="div" size="2" color="gray">
            Writer, Brewer
          </Text>
        </Box>

      </Flex>

      <Flex gap="2">
        <TagList tags={tags} />
      </Flex>

    </Flex>
  );
}
