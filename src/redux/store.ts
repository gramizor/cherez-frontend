import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware, { Task } from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'
import { Store } from 'redux'
import rootReducer from 'src/redux/rootReducer'
import rootSaga from 'src/saga/rootSaga'

export interface SagaStore extends Store {
  sagaTask?: Task
}

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const store: SagaStore = configureStore({
    reducer: rootReducer,
    middleware: [
      ...getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
        immutableCheck: false,
      }),
      sagaMiddleware,
    ],
    devTools: true,
  })

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

const wrapper = createWrapper(makeStore, { debug: false })
export default wrapper
