import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/rootReducer'

export const createAdPromotionLoading = createSelector(
  [(state: RootState) => state.promotion.loading],
  loading => loading
)

export const createAdPromotionError = createSelector([(state: RootState) => state.promotion.error], error => error)

export const selectPromotions = createSelector(
  [(state: RootState) => state.promotion.promotions],
  promotions => promotions
)
export const selectMyBoostedAds = createSelector(
  [(state: RootState) => state.promotion.boostedAds],
  boostedAds => boostedAds
)

export const selectMyLargeAds = createSelector([(state: RootState) => state.promotion.largeAds], largeAds => largeAds)
