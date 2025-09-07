// src/views/pages/LogoutHandler.jsx
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout as logoutApi } from '../api/logout'
import { logout } from '../features/auth/authSlice'

const LogoutHandler = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const performLogout = async () => {
      const token = localStorage.getItem('token')
      try {
        if (token) {
          await logoutApi(token) // Gọi API logout
        }
      } catch (err) {
        console.error('Logout error:', err)
      }

      // Clear redux + localStorage
      dispatch(logout())
      localStorage.removeItem('token')

      navigate('/login')
    }

    performLogout()
  }, [dispatch, navigate])

  return null // Không render gì cả
}

export default LogoutHandler
