import { userModel } from '@modules/user/model';
import { Widget } from '@modules/user/ui/widget/widget';
import { Badge, Flex, Progress, Separator, Text } from '@radix-ui/themes';
import { Beer, HandHeart, MessageCircleHeart } from 'lucide-react';

interface Props {
  likedPostsCount?: number;
  likedCommentsCount?: number;
  ordersCount?: number;
}

export function ActivityWidget({ likedCommentsCount, likedPostsCount, ordersCount }: Props) {
  const rank = userModel.getBeerRank(ordersCount);
  return (
    <Widget
      title="Activity"
      description="Interaction statistics"
    >
      <Flex direction="column" gap="1">

        <Flex align="center" gap="2">
          <HandHeart color="green" size={20} strokeWidth="1.5" />
          <Text size="2">posts</Text>
          <Badge color="gray" size="1">
            {likedPostsCount}
            {' '}
            {likedPostsCount === 1 ? 'like' : 'likes'}
          </Badge>
        </Flex>

        <Flex align="center" gap="2">
          <MessageCircleHeart color="green" size={20} strokeWidth="1.5" />
          <Text size="2">comments</Text>
          <Badge color="gray" size="1">
            {likedCommentsCount}
            {' '}
            {likedCommentsCount === 1 ? 'like' : 'likes'}
          </Badge>
        </Flex>

        <Separator size="4" mt="2" mb="3" />

        <Flex direction="row" justify="center" gap="1">
          <Text size="2" align="center">Rank by orders</Text>
          <Beer color="green" size={18} strokeWidth="1.5" />
        </Flex>

        <Flex direction="column">
          <Flex direction="row" justify="between" align="center">
            <Text size="2" color="gray">{rank.rank}</Text>
            <Text size="2" color="gray">
              {rank.current}
              {' '}
              /
              {' '}
              {rank.max}
            </Text>
          </Flex>
          <Progress value={rank.current} max={rank.max} />
        </Flex>

      </Flex>
    </Widget>
  );
}
