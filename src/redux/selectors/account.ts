import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/rootReducer'

export const getLoadingAccount = createSelector([(state: RootState) => state.account.loading], loading => loading)

export const getAccount = createSelector([(state: RootState) => state.account.user], user => user)

export const getLoadingAccountAds = createSelector(
  [(state: RootState) => state.account.loadingAds],
  loadingAds => loadingAds
)

export const getAccountAds = createSelector([(state: RootState) => state.account.ads], ads => ads)
export const getCanLoadMore = createSelector(
  [(state: RootState) => state.account.canLoadMore],
  canLoadMore => canLoadMore
)

export const getSkipAccountParam = createSelector([(state: RootState) => state.account.params], params => params.skip)
