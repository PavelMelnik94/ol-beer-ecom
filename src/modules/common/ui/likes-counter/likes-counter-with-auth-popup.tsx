import type { LikesCounterProps } from './types';
import { withAuthorizePopup } from '@modules/auth';
import { LikesCounter } from './likes-counter';

export const LikesCounterWithAuthorizePopup = withAuthorizePopup<LikesCounterProps>(LikesCounter);
