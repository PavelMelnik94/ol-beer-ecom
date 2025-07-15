import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/api';
import type { Address, FavoriteProduct, Rating, User } from '@kernel/types';
import type {
  CreateAddressData,
  ToggleFavoriteData,
  UpdateAddressData,
  UploadAvatarData,
} from '@modules/user/model';
import type { UserProfile } from '@modules/user/types';
import { API_ENDPOINTS, apiClient } from '@kernel/api';

export type SuccessResponse<T> = ApiSuccessResponse<T>;
export type ErrorResponse = ApiErrorResponse;
export type SuccessResponseAddresses = ApiSuccessResponse<Address[]>;
export type SuccessResponseAddress = ApiSuccessResponse<Address>;
export type SuccessResponseAvatar = ApiSuccessResponse<{ avatarUrl: string; }>;
export type SuccessResponseFavorites = ApiSuccessResponse<FavoriteProduct[]>;
export type SuccessResponseRatings = ApiSuccessResponse<Rating[]>;
export type SuccessResponseProfile = ApiSuccessResponse<UserProfile>;

async function getAddresses(): Promise<SuccessResponseAddresses> {
  return apiClient.get(API_ENDPOINTS.users.addresses);
}

async function createAddress(data: CreateAddressData): Promise<SuccessResponseAddress> {
  return apiClient.post(API_ENDPOINTS.users.addresses, data);
}

async function getAddress(id: string): Promise<SuccessResponseAddress> {
  return apiClient.get(API_ENDPOINTS.users.address(id));
}

async function updateAddress(id: string, data: UpdateAddressData): Promise<SuccessResponseAddress> {
  return apiClient.patch(API_ENDPOINTS.users.address(id), data);
}

async function deleteAddress(id: string): Promise<SuccessResponse<void>> {
  return apiClient.delete(API_ENDPOINTS.users.address(id));
}

async function setAddressPrimary(id: string): Promise<SuccessResponseAddress> {
  return apiClient.patch(API_ENDPOINTS.users.setAddressPrimary(id));
}

async function uploadAvatar(data: UploadAvatarData): Promise<SuccessResponseAvatar> {
  const formData = new FormData();
  formData.append('avatar', data.avatar);

  return apiClient.post(API_ENDPOINTS.users.avatar, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function deleteAvatar(): Promise<SuccessResponse<void>> {
  return apiClient.delete(API_ENDPOINTS.users.avatar);
}

async function getAvatarUrl(): Promise<SuccessResponseAvatar> {
  return apiClient.get(API_ENDPOINTS.users.avatar);
}

async function getBillingAddresses(): Promise<SuccessResponseAddresses> {
  return apiClient.get(API_ENDPOINTS.users.billingAddresses);
}

async function getShippingAddresses(): Promise<SuccessResponseAddresses> {
  return apiClient.get(API_ENDPOINTS.users.shippingAddresses);
}

async function getFavorites(): Promise<SuccessResponseFavorites> {
  return apiClient.get(API_ENDPOINTS.users.favorites);
}

async function toggleFavorite(data: ToggleFavoriteData): Promise<SuccessResponse<void>> {
  return apiClient.post(API_ENDPOINTS.users.favorites, data);
}

async function getRatings(): Promise<SuccessResponseRatings> {
  return apiClient.get(API_ENDPOINTS.users.ratings);
}

async function getProfile(): Promise<SuccessResponseProfile> {
  return apiClient.get(API_ENDPOINTS.users.profile);
}

async function updateProfile(data: Partial<UserProfile>): Promise<SuccessResponseProfile> {
  return apiClient.patch(API_ENDPOINTS.users.profile, data);
}

export const userApi = {
  getAddresses,
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
  setAddressPrimary,

  uploadAvatar,
  deleteAvatar,
  getAvatarUrl,

  getBillingAddresses,
  getShippingAddresses,

  getFavorites,
  toggleFavorite,

  getRatings,

  getProfile,
  updateProfile,
};
