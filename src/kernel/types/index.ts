export interface Address {
  id: string;
  city: string;
  country: string;
  streetName: string;
  zip: string;
  type: 'billing' | 'shipping';
  isPrimaryAddress: boolean
}

export interface User {
  id: string;

  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;

  addresses: Address[] | [];
  likedPostIds: string[] | [];
  likedCommentIds: string[] | [];

  token: string;
  createdAt: string;
  updatedAt: string;
}
