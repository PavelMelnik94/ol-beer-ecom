import { useUserStore } from '@kernel/stores';
import { z } from 'zod';

export function getIsLiked(likeListForCheck: string[] | [] | undefined): boolean {
  const userId = useUserStore.getState().profile?.id;
  if (z.string().safeParse(userId).success
    && Array.isArray(likeListForCheck)
    && z.array(z.string()).safeParse(likeListForCheck).success
  ) {
    return typeof userId && likeListForCheck.length > 0
      ? likeListForCheck.includes(userId as never)
      : false;
  }
  return false;
}
