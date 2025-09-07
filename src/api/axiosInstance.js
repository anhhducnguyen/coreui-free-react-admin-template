import axios from 'axios'

const API = axios.create({
  baseURL: 'https://website-selling-cosmetics-v4.onrender.com/api/v1',
})

// Gắn token từ localStorage hoặc Redux vào headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // hoặc lấy từ Redux
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
