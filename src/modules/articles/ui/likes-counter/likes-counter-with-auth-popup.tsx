import { withAuthorizePopup } from '@modules/auth';
import { LikesCounter } from './likes-counter';
import type { LikesCounterProps } from './types';

export const LikesCounterWithAuthorizePopup = withAuthorizePopup<LikesCounterProps>(LikesCounter);
