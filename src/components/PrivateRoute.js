import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Chỉ cho phép nếu user có role là Admin
  if (user.role?.name !== 'Admin') {
    return <Navigate to="/404" replace />
  }

  return children
}

export default PrivateRoute
