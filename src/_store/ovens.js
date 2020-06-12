import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers'

const ovensSlice = createSlice({
  name: 'ovens',
  initialState: {
    getOvensUI: UI_INIT_STATE(),
    getOvenUI: UI_INIT_STATE(),
    addOvenUI: UI_INIT_STATE(),
    updateOvenUI: UI_INIT_STATE(),
    deleteOvenUI: UI_INIT_STATE(),
    list: {}
  },
  reducers: {
    getOvensSent: (state, _) => {
      state.getOvensUI = UI_LOADING_STATE()
    },
    getOvensFailed: (state, { payload }) => {
      state.getOvensUI = UI_ERROR_STATE(payload)
    },
    getOvensSucceed: (state, { payload }) => {
      state.getOvensUI = UI_INIT_STATE()
      state.list = _.mapKeys(payload, 'id')
    },
    getOvenSent: (state, _) => {
      state.getOvenUI = UI_LOADING_STATE()
    },
    getOvenFailed: (state, { payload }) => {
      state.getOvenUI = UI_ERROR_STATE(payload)
    },
    getOvenSucceed: (state, { payload }) => {
      state.getOvenUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    addOvenSent: (state, _) => {
      state.addOvenUI = UI_LOADING_STATE()
    },
    addOvenFailed: (state, { payload }) => {
      state.addOvenUI = UI_ERROR_STATE(payload)
    },
    addOvenSucceed: (state, { payload }) => {
      state.addOvenUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    updateOvenSent: (state, _) => {
      state.updateOvenUI = UI_LOADING_STATE()
    },
    updateOvenFailed: (state, { payload }) => {
      state.updateOvenUI = UI_ERROR_STATE(payload)
    },
    updateOvenSucceed: (state, { payload }) => {
      state.updateOvenUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    deleteOvenSent: (state, _) => {
      state.deleteOvenUI = UI_LOADING_STATE()
    },
    deleteOvenFailed: (state, { payload }) => {
      state.deleteOvenUI = UI_ERROR_STATE(payload)
    },
    deleteOvenSucceed: (state, { payload }) => {
      state.deleteOvenUI = UI_INIT_STATE()
      state.list = _.omit(state.list, payload.id)
    }
  }
})

export const actions = ovensSlice.actions
export default ovensSlice.reducer
