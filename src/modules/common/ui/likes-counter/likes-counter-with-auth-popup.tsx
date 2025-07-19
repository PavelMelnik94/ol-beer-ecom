import type { LikesCounterProps as LikesCounterProperties } from './types';
import { withAuthorizePopup } from '@modules/auth';
import { LikesCounter } from './likes-counter';

export const LikesCounterWithAuthorizePopup = withAuthorizePopup<LikesCounterProperties>(LikesCounter);
