import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/rootReducer'

export const getIsSignedIn = createSelector([(state: RootState) => state.auth.isSignedIn], isSignedIn => isSignedIn)
export const getErrorSignUp = createSelector([(state: RootState) => state.auth.error], error => error)
export const getLoading = createSelector([(state: RootState) => state.auth.loading], loading => loading)
export const getCurrentUser = createSelector([(state: RootState) => state.auth.currentUser], currentUser => currentUser)
