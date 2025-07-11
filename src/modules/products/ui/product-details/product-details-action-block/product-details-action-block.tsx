import { ButtonWithAuthPopup } from '@modules/common';
import { Flex, Tooltip } from '@radix-ui/themes';
import { StarRating } from '@shared/components';
import { Heart } from 'lucide-react';

export function ProductDetailsActionBlock({
  isFavorite,
  userRating = 0,
  onClickAddToWishlist,
  onClickRating,
}: {
  isFavorite: boolean;
  userRating: number;
  onClickAddToWishlist: () => void;
  onClickRating: (rating: number) => void;
}) {
  return (
    <Flex justify="between" direction="row" gap="2" mb="5">
      <ButtonWithAuthPopup
        size="1"
        variant="soft"
        style={{ padding: '6px' }}
        onClick={(e) => {
          e.stopPropagation();
          onClickAddToWishlist?.();
        }}
      >
        <Tooltip content={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'} side="top">
          <Heart size={12} fill={isFavorite ? 'red' : 'transparent'} color={isFavorite ? 'red' : 'gray'} />
        </Tooltip>
      </ButtonWithAuthPopup>

      <StarRating
        currentRating={userRating}
        onRatingClick={rating => onClickRating?.(rating)}
        size={16}
        showTooltip={true}
      />
    </Flex>
  );
}
