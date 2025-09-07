// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   user: null,
//   token: localStorage.getItem('token') || null,
// }

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.user = action.payload.user
//       state.token = action.payload.token
//     },
//     logout: (state) => {
//       state.user = null
//       state.token = null
//       localStorage.removeItem('token')
//     },
//   },
// })

// export const { loginSuccess, logout } = authSlice.actions
// export default authSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

// Lấy user từ localStorage (nếu có)
const savedUser = localStorage.getItem('user')
const savedToken = localStorage.getItem('token')

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', action.payload.token)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
