import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

import authReducer from './auth'
import lookupsReducer from './lookups'
import pistonsReducer from './pistons'
import modelsReducer from './models'
import cagesReducer from './cages'
import ovensReducer from './ovens'
import customersReducer from './customers'
import ordersReducer from './orders'

const rootReducer = combineReducers({
  auth: authReducer,
  lookups: lookupsReducer,
  pistons: pistonsReducer,
  models: modelsReducer,
  cages: cagesReducer,
  ovens: ovensReducer,
  customers: customersReducer,
  orders: ordersReducer,
})

const persistConfig = { key: 'auth', storage: storage, whitelist: ['auth'] }
const rootReducerWithPersist = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducerWithPersist,
  middleware: [
    ...getDefaultMiddleware(),
    logger
  ]
})

export const persistor = persistStore(store)
