import type { ApiSuccessResponse } from '@kernel/api';
import type { RegisterBody } from '@modules/auth/model/types';
import { API_ENDPOINTS, apiClient } from '@kernel/api';

export interface RegisterResponse {
  token: string;
  firstName: string;
}
async function register(data: RegisterBody): Promise<ApiSuccessResponse<RegisterResponse>> {
  return apiClient.post(API_ENDPOINTS.auth.register, data);
}

export const authApi = {
  register,

} as const;
