import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/rootReducer'

export const proLoading = createSelector([(state: RootState) => state.pro.loading], loading => loading)

export const proError = createSelector([(state: RootState) => state.pro.error], error => error)

export const selectProImageLimit = createSelector(
  [(state: RootState) => state.pro.proImageLimit],
  proImageLimit => proImageLimit
)

export const selectProAdsCounter = createSelector(
  [(state: RootState) => state.pro.proAdsCounter],
  proAdsCounter => proAdsCounter
)

export const selectProProfiles = createSelector(
  [(state: RootState) => state.pro.proProfiles],
  proProfiles => proProfiles
)

export const selectSingleProProfile = createSelector(
  [(state: RootState) => state.pro.singleProProfile],
  singleProProfile => singleProProfile
)
