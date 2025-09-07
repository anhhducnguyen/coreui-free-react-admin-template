// src/api/logout.js
import axios from 'axios'

export const logout = async (token) => {
  return axios.post('https://website-selling-cosmetics-v4.onrender.com/api/v1/auth/logout', {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-custom-lang': 'en',
    },
  })
}
