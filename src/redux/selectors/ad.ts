import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/rootReducer'

export const getLoadingAd = createSelector([(state: RootState) => state.ad.loading], loading => loading)

export const getLoadingOwnerAd = createSelector(
  [(state: RootState) => state.ad.loadingOwner],
  loadingOwner => loadingOwner
)

export const getCurrentAd = createSelector([(state: RootState) => state.ad.currentAd], currentAd => currentAd)

export const getOwnerAd = createSelector([(state: RootState) => state.ad.owner], owner => owner)

export const getProfileCompany = createSelector(
  [(state: RootState) => state.ad.companyProfile],
  companyProfile => companyProfile
)
