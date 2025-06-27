import { Flex, Text } from '@radix-ui/themes';
import { LikesCounter } from '../likes-counter/likes-counter';

interface Props {
  likesCount: number;
  likePost: () => void;
}
export function LikeAndComment({ likesCount, likePost }: Props) {
  return (
    <Flex direction="row" justify="start" align="center" gap="1" mb="4" wrap="wrap">
      <Text size="2" color="gray">
        Support the article with a like
      </Text>
      <LikesCounter likesCount={likesCount} onClick={likePost} />
      <Text size="2" color="gray">
        and a comment
      </Text>
    </Flex>
  )
}
