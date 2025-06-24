import type { AuthResponse, LoginCredentials, RegisterData, User } from '../types'

export const authApi = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Mock implementation - replace with real API call
    const response = await new Promise<AuthResponse>((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
          resolve({
            user: {
              id: 1,
              email: credentials.email,
              name: 'Demo User',
              role: 'user',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
          })
        }
        else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })

    return response
  },

  // Register user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    // Mock implementation
    const response = await new Promise<AuthResponse>((resolve, reject) => {
      setTimeout(() => {
        if (data.password !== data.confirmPassword) {
          reject(new Error('Passwords do not match'))
          return
        }

        resolve({
          user: {
            id: Math.floor(Math.random() * 1000),
            email: data.email,
            name: data.name,
            role: 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        })
      }, 1000)
    })

    return response
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    // Mock implementation
    const response = await new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          email: 'demo@example.com',
          name: 'Demo User',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      }, 500)
    })

    return response
  },

  // Logout user
  logout: async (): Promise<void> => {
    // Mock implementation
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  },

}
