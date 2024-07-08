import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/rootReducer'

export const getCategoryAdCreateForm = createSelector(
  [(state: RootState) => state.adCreate.form],
  form => form.category
)

export const getAdCreateForm = createSelector([(state: RootState) => state.adCreate.form], form => form)

export const getAdCreateObjectId = createSelector([(state: RootState) => state.adCreate.objectId], objectId => objectId)

export const getAdCreateError = createSelector([(state: RootState) => state.adCreate.error], error => error)
