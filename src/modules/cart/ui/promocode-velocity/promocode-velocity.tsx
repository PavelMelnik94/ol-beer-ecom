import { VelocityScroll } from '@kernel/components';
import { toast } from '@kernel/notifications';
import { getRandomPromoCode } from '@modules/cart/utils/get-random-promocode';
import { Text } from '@radix-ui/themes';
import { Beer } from 'lucide-react';

export function PromoCodeVelocity({ onClickPromocode }: { onClickPromocode: (promoCode: string) => void; }) {
  const promoCode = getRandomPromoCode();
  if (!promoCode) return;

  const { code, discount, description } = promoCode;
  return (
    <VelocityScroll
      numRows={2}
      rotateDeg={1}
      onClick={() => {
        toast.success(`${description}`, <Beer />);
        onClickPromocode?.(promoCode.code);
      }}
    >
      <Text size="9" weight="bold" color="bronze">
        {code.toUpperCase()}
        {' '}
        -
        {' '}
        {discount.toUpperCase()}
      </Text>
    </VelocityScroll>
  );
}
