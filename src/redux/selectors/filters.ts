import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/rootReducer'

export const getAllCurrenciesFilters = createSelector(
  [(state: RootState) => state.filters.allCurrencies],
  allCurrencies => allCurrencies
)
export const getFromFilters = createSelector([(state: RootState) => state.filters.from], from => from)
export const getToFilters = createSelector([(state: RootState) => state.filters.to], to => to)
export const getCurrencyFilters = createSelector([(state: RootState) => state.filters.currency], currency => currency)
export const getCategoryParamsFilters = createSelector(
  [(state: RootState) => state.filters.categoryParams],
  categoryParams => categoryParams
)
