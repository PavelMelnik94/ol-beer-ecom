import type { ApiSuccessResponse } from '@kernel/api';
import type { User } from '@kernel/types';
import type { RegisterBody } from '@modules/auth/model/types';
import { API_ENDPOINTS, apiClient } from '@kernel/api';

async function register(data: RegisterBody): Promise<ApiSuccessResponse<User>> {
  return apiClient.post(API_ENDPOINTS.auth.register, data);
}

export const authApi = {
  register,

} as const;
