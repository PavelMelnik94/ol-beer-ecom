import type { LikesCounterProps as LikesCounterProperties } from './types';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { Show } from '@shared/components';
import { Heart } from 'lucide-react';

function LikedHeart({ heartSize }: { heartSize?: number; }) {
  return <Heart size={heartSize} min={heartSize} color="red" stroke="red" fill="red" />;
}

function UnlikedHeart({ heartSize }: { heartSize?: number; }) {
  return <Heart size={heartSize} min={heartSize} color="gray" />;
}
export function LikesCounter({
  likesCount,
  onClick,
  heartSize = 16,
  textSize = '2',
  isLiked,
}: LikesCounterProperties) {
  const handleClick = () => {
    onClick?.(!isLiked);
  };

  if (likesCount < 0) {
    throw new Error('Likes count cannot be negative');
  }
  return (
    <Tooltip content={`${likesCount} ${likesCount === 1 ? 'clap' : 'claps'}`}>
      <Flex direction="row" align="center" gap="1" onClick={handleClick}>
        <Show when={isLiked} fallback={<UnlikedHeart heartSize={heartSize} />}>
          <LikedHeart heartSize={heartSize} />
        </Show>

        <Text size={textSize} color="gray">
          {likesCount}
        </Text>
      </Flex>
    </Tooltip>
  );
}
