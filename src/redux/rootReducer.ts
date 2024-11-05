import { combineReducers } from '@reduxjs/toolkit'

import mainSearch from 'src/redux/slices/mainSearch'
import auth from 'src/redux/slices/auth'
import filters from 'src/redux/slices/filters'
import ad from 'src/redux/slices/ad'
import account from 'src/redux/slices/account'
import adCreate from 'src/redux/slices/adCreate'
import wallet from './slices/wallet'
import promotion from './slices/promotion'
import pro from './slices/pro'
import myAds from './slices/myAds'
import location from './slices/location'

const rootReducer = combineReducers({
  mainSearch,
  auth,
  filters,
  ad,
  account,
  adCreate,
  wallet,
  promotion,
  pro,
  myAds,
  location,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
