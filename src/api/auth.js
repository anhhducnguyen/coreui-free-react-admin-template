import axios from 'axios'

const API = axios.create({
  baseURL: 'https://website-selling-cosmetics-v4.onrender.com/api/v1/auth/email/',
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

export const login = (data) => API.post('/login', data)
export const getProfile = () => API.get('/me')
