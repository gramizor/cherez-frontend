import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ErrorResponse } from '@/src/types/redux'
import { forEach } from 'lodash'
import { MainSearchState } from '@/src/types/redux/mainSearch'
import { SortAdsType } from '@/src/enums/redux'

const initialState: MainSearchState = {
  loading: false,
  error: null,
  collection: [],
  canLoadMore: true,
  loadMore: false,
  params: {
    searchText: '',
    city: '',
    country: '',
    category: '',
    sort: SortAdsType.New,
    skip: 0,
    limit: 12,
    categoryParams: [],
    currencyCode: '',
    minPrice: null,
    maxPrice: null,
  },
}

const slice = createSlice({
  name: 'mainSearch',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      forEach(action.payload, (value, key: any) => {
        ;(state.params as any)[key] = value
      })
    },
    setLoadMore: state => {
      state.loadMore = !state.loadMore
    },
    searchAdsRequested: state => {
      state.loading = true
    },
    searchAdsSucceed: (state, action) => {
      state.collection = state.loadMore ? [...state.collection, ...action.payload] : action.payload
      state.canLoadMore = action.payload.length === 12
      state.loadMore = false
      state.loading = false
      state.error = null
    },
    searchAdsFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
  },
})

export const { setSearchParams, setLoadMore, searchAdsSucceed, searchAdsFailed, searchAdsRequested } = slice.actions

export default slice.reducer
