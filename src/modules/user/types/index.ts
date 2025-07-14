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
  createdAt: string;
  updatedAt: string;
}
export interface ActivityWidgetProps {
  likedPostsCount: number;
  likedCommentsCount: number;
}

export interface AddressWidgetProps {
  addresses: Address[];
}

export interface AccountInfoWidgetProps {
  id: string;
  updatedAt: string;
}
