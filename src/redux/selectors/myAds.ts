import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/rootReducer'

export const getLoadingMyAds = createSelector([(state: RootState) => state.myAds.loading], loading => loading)

export const getErrorMyAds = createSelector([(state: RootState) => state.myAds.error], error => error)

export const getMyProAds = createSelector([(state: RootState) => state.myAds.myProAds], myProAds => myProAds)

export const getMyCommonAds = createSelector([(state: RootState) => state.myAds.myAds], myAds => myAds)

export const getMyProProfiles = createSelector(
  [(state: RootState) => state.myAds.myProProfiles],
  myProProfiles => myProProfiles
)
