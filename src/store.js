// import { legacy_createStore as createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
//   theme: 'light',
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store


import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default store
