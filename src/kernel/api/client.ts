import type { AxiosError, AxiosResponse } from 'axios';
import { ROUTES } from '@kernel/router';
import { tokenStorage } from '@kernel/storage';
import { useAuthStore } from '@kernel/stores';
import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.MODE === 'development') {
      // eslint-disable-next-line no-console
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.MODE === 'development') {
      // eslint-disable-next-line no-console
      console.log('✅ API Response:', response.status, response.config.url);
    }

    return response.data;
  },
  (error: AxiosError) => {
    console.error('❌ Response Error:', error.response?.status, error.config?.url);

    // Handle unauthorized
    if (error.response?.status === 401) {
      useAuthStore.getState().clearToken();

      if (globalThis.location.pathname !== ROUTES.auth.register.full) {
        globalThis.location.replace(ROUTES.auth.register.full);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
