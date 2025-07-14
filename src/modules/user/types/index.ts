import type { Address } from '@kernel/types';

export interface HeaderWidgetProps {
  firstName: string;
  lastName: string;
  createdAt: string;
  avatar?: string;
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
