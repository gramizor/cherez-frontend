import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/rootReducer'

export const getLoadingMainSearch = createSelector([(state: RootState) => state.mainSearch.loading], loading => loading)

export const getCountryMainSearchParam = createSelector(
  [(state: RootState) => state.mainSearch.params],
  params => params.country
)

export const getCurrencyCodeMainSearchParam = createSelector(
  [(state: RootState) => state.mainSearch.params],
  params => params.currencyCode
)

export const getMinPriceMainSearchParam = createSelector(
  [(state: RootState) => state.mainSearch.params],
  params => params.minPrice
)

export const getMaxPriceMainSearchParam = createSelector(
  [(state: RootState) => state.mainSearch.params],
  params => params.maxPrice
)

export const getCityMainSearchParam = createSelector(
  [(state: RootState) => state.mainSearch.params],
  params => params.city
)

export const getCategoryMainSearchParam = createSelector(
  [(state: RootState) => state.mainSearch.params],
  params => params.category
)

export const getCategoryParamsMainSearchParam = createSelector(
  [(state: RootState) => state.mainSearch.params],
  params => params.categoryParams
)

export const getSortMainSearchParam = createSelector(
  [(state: RootState) => state.mainSearch.params],
  params => params.sort
)

export const getCollectionMainSearchParam = createSelector(
  [(state: RootState) => state.mainSearch.collection],
  collection => collection
)

export const getCanLoadMoreMainSearchParam = createSelector(
  [(state: RootState) => state.mainSearch.canLoadMore],
  canLoadMore => canLoadMore
)

export const getSkipMainSearchParam = createSelector(
  [(state: RootState) => state.mainSearch.params],
  params => params.skip
)
