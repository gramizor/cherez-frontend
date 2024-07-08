import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ErrorResponse } from '@/src/types/redux'
import { AuthState, CurrentUserResponse } from '@/src/types/redux/auth'

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
  isSignedIn: false,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userRegistrationRequested: (state, action) => {
      state.loading = true
    },
    userRegistrationSucceed: state => {
      state.loading = false
      state.isSignedIn = true
      state.error = null
    },
    userRegistrationFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
    userLoginRequested: (state, action) => {
      state.loading = true
    },
    userLoginSucceed: state => {
      state.loading = false
      state.isSignedIn = true
      state.error = null
    },
    userLoginFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
    userLogoutRequested: state => {
      state.loading = true
    },
    userLogoutSucceed: state => {
      state.loading = false
      state.isSignedIn = false
      state.currentUser = null
      state.error = null
    },
    userLogoutFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
    currentUserRequested: state => {
      state.loading = true
    },
    currentUserSucceeded: (state, action: PayloadAction<CurrentUserResponse>) => {
      state.currentUser = action.payload
      state.loading = false
      state.isSignedIn = true
      state.error = null
    },
    currentUserFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },
    clearError: state => {
      state.error = null
    },
  },
})

export const {
  userRegistrationRequested,
  userRegistrationSucceed,
  userRegistrationFailed,
  clearError,
  userLoginSucceed,
  userLoginRequested,
  userLoginFailed,
  currentUserSucceeded,
  currentUserFailed,
  currentUserRequested,
  userLogoutSucceed,
  userLogoutFailed,
  userLogoutRequested,
} = slice.actions

export default slice.reducer
