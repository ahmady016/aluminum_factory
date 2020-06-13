import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers'

const cagesSlice = createSlice({
  name: 'cages',
  initialState: {
    getCagesUI: UI_INIT_STATE(),
    getCageUI: UI_INIT_STATE(),
    addCageUI: UI_INIT_STATE(),
    updateCageUI: UI_INIT_STATE(),
    deleteCageUI: UI_INIT_STATE(),
    list: {}
  },
  reducers: {
    getCagesSent: (state, _) => {
      state.getCagesUI = UI_LOADING_STATE()
    },
    getCagesFailed: (state, { payload }) => {
      state.getCagesUI = UI_ERROR_STATE(payload)
    },
    getCagesSucceed: (state, { payload }) => {
      state.getCagesUI = UI_INIT_STATE()
      state.list = _.mapKeys(payload, 'id')
    },
    getCageSent: (state, _) => {
      state.getCageUI = UI_LOADING_STATE()
    },
    getCageFailed: (state, { payload }) => {
      state.getCageUI = UI_ERROR_STATE(payload)
    },
    getCageSucceed: (state, { payload }) => {
      state.getCageUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    addCageSent: (state, _) => {
      state.addCageUI = UI_LOADING_STATE()
    },
    addCageFailed: (state, { payload }) => {
      state.addCageUI = UI_ERROR_STATE(payload)
    },
    addCageSucceed: (state, { payload }) => {
      state.addCageUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    updateCageSent: (state, _) => {
      state.updateCageUI = UI_LOADING_STATE()
    },
    updateCageFailed: (state, { payload }) => {
      state.updateCageUI = UI_ERROR_STATE(payload)
    },
    updateCageSucceed: (state, { payload }) => {
      state.updateCageUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    deleteCageSent: (state, _) => {
      state.deleteCageUI = UI_LOADING_STATE()
    },
    deleteCageFailed: (state, { payload }) => {
      state.deleteCageUI = UI_ERROR_STATE(payload)
    },
    deleteCageSucceed: (state, { payload }) => {
      state.deleteCageUI = UI_INIT_STATE()
      state.list = _.omit(state.list, payload.id)
    }
  }
})

export const actions = cagesSlice.actions
export default cagesSlice.reducer
