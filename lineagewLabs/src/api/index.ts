import axios from 'axios'
import type { ApiResponse } from '@/types'

// 建立 axios 實例
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 請求攔截器
apiClient.interceptors.request.use(
  (config) => {
    // 可以在這裡添加認證 token
    return config
  },
  (error) => Promise.reject(error),
)

// 回應攔截器
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 統一錯誤處理
    console.error('API Error:', error)
    return Promise.reject(error)
  },
)

export { apiClient }
export type { ApiResponse }
