import { get, isFunction } from 'lodash'
import { PayloadAction } from '@reduxjs/toolkit'
import { CreateAdForm } from '@/src/types/redux/adCreate'

function runPayloadOption(action: PayloadAction<CreateAdForm>, alias: string, params: any) {
  const waitFunction = get(action.payload, alias, false)
  if (isFunction(waitFunction)) waitFunction(params)
}

export default runPayloadOption
