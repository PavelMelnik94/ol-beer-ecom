import axios, { type AxiosError, type AxiosResponse } from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (import.meta.env.MODE === 'development') {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url)
    }

    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.MODE === 'development') {
      console.log('✅ API Response:', response.status, response.config.url)
    }

    return response
  },
  (error: AxiosError) => {
    console.error('❌ Response Error:', error.response?.status, error.config?.url)

    // Handle unauthorized
    // if (error.response?.status === 401) {
    //   localStorage.removeItem('auth_token')
    //   window.location.href = '/login'
    // }

    return Promise.reject(error)
  },
)

export default apiClient
