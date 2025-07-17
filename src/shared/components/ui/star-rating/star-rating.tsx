import { Flex, Text, Tooltip } from '@radix-ui/themes';
import { Flame } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  maxRating?: number;
  currentRating?: number;
  onRatingClick?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
  showTooltip?: boolean;
  showRatingText?: boolean;
  userRating?: number;
}

export function StarRating({
  maxRating = 5,
  currentRating = 0,
  userRating = undefined,
  onRatingClick,
  size = 16,
  readonly = false,
  showTooltip = true,
  showRatingText = false,
}: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleStarClick = (rating: number) => {
    if (readonly) return;
    onRatingClick?.(rating);
  };

  const handleStarHover = (rating: number) => {
    if (readonly) return;
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    if (readonly) return;
    setHoveredRating(null);
  };

  const getStarColor = (starIndex: number) => {
    const displayRating = hoveredRating ?? userRating ?? currentRating;
    return starIndex <= displayRating ? '#ffd700' : '#e0e0e0';
  };

  const getStarFill = (starIndex: number) => {
    const displayRating = hoveredRating ?? userRating ??  currentRating;
    return starIndex <= displayRating ? '#ffd700' : 'none';
  };

  return (
    <Flex align="center" gap="2">
      <Flex align="center" gap="1">
        {Array.from({ length: maxRating }, (_, index) => {
          const starIndex = index + 1;
          const starElement = (
            <Flame
              key={starIndex}
              size={size}
              color={getStarColor(starIndex)}
              fill={getStarFill(starIndex)}
              style={{
                cursor: readonly ? 'default' : 'pointer',
                transition: 'color 0.2s ease',
              }}
              onClick={() => { handleStarClick(starIndex); }}
              onMouseEnter={() => { handleStarHover(starIndex); }}
              onMouseLeave={handleStarLeave}
            />
          );

          if (showTooltip && !readonly) {
            return (
              <Tooltip key={starIndex} content={`Rate ${starIndex} star${starIndex > 1 ? 's' : ''}`} side="top">
                {starElement}
              </Tooltip>
            );
          }

          return starElement;
        })}
      </Flex>

      {showRatingText && (
        <Text size="2" color="gray">
          {currentRating > 0 ? `${currentRating.toFixed(1)}/${maxRating}` : 'No rating'}
        </Text>
      )}
    </Flex>
  );
}
