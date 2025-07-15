import type { Address } from '@kernel/types';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  addresses: Address[];
  likedPostsCount: number;
  likedCommentsCount: number;
  ordersCount: number;
  createdAt: string;
  updatedAt: string;
}
