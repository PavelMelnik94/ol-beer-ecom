import type { PromoCode } from '@kernel/types';
import { getRandomFromArray } from '@shared/utils';

export function getRandomPromoCode(): PromoCode | undefined {
  const promoCodes: PromoCode[] = [{
    code: 'WELCOME10',
    discount: '10% OFF',
    description: 'Welcome discount for new customers',
  }, {
    code: 'BEER20',
    discount: '20% OFF',
    description: '20% off on all beers',
  }, {
    code: 'SUMMER30',
    discount: '30% OFF',
    description: '30% off on summer collection',
  }];
  return getRandomFromArray(promoCodes);
}
