import { createSlice } from '@reduxjs/toolkit'
import { forEach } from 'lodash'
import { FiltersState } from '@/src/types/redux/filters'

const initialState: FiltersState = {
  allCurrencies: [
    'USD',
    'THB',
    'VND',
    'IDR',
    'MYR',
    'INR',
    'KHR',
    'LAK',
    'RUB',
    'AED',
    'TRY',
    'GEL',
    'AMD',
    'CNY',
    'ARS',
    'AZN',
    'BRL',
    'BYN',
    'KZT',
    'KGS',
    'TMT',
    'TJS',
    'UAH',
    'UZS',
  ],
  from: null,
  to: null,
  currency: '',
  categoryParams: [],
}

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setInitialValue: (state, action) => {
      forEach(action.payload, (value, key: any) => {
        ;(state as any)[key] = value
      })
    },
  },
})

export const { setInitialValue } = slice.actions

export default slice.reducer
