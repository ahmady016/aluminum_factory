import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers/request'

const ovensSlice = createSlice({
  name: 'ovens',
  initialState: {
    getOvens: UI_INIT_STATE(),
    getOven: UI_INIT_STATE(),
    addOven: UI_INIT_STATE(),
    updateOven: UI_INIT_STATE(),
    deleteOven: UI_INIT_STATE(),
    list: {}
  },
  reducers: {
    getOvensSent: (state, _) => {
      state.getOvens = UI_LOADING_STATE()
    },
    getOvensFailed: (state, { payload }) => {
      state.getOvens = UI_ERROR_STATE(payload)
    },
    getOvensSucceed: (state, { payload }) => {
      state.getOvens = UI_INIT_STATE()
      state.list = _.mapKeys(payload, 'id')
    },
    getOvenSent: (state, _) => {
      state.getOven = UI_LOADING_STATE()
    },
    getOvenFailed: (state, { payload }) => {
      state.getOven = UI_ERROR_STATE(payload)
    },
    getOvenSucceed: (state, { payload }) => {
      state.getOven = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    addOvenSent: (state, _) => {
      state.addOven = UI_LOADING_STATE()
    },
    addOvenFailed: (state, { payload }) => {
      state.addOven = UI_ERROR_STATE(payload)
    },
    addOvenSucceed: (state, { payload }) => {
      state.addOven = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    updateOvenSent: (state, _) => {
      state.updateOven = UI_LOADING_STATE()
    },
    updateOvenFailed: (state, { payload }) => {
      state.updateOven = UI_ERROR_STATE(payload)
    },
    updateOvenSucceed: (state, { payload }) => {
      state.updateOven = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    deleteOvenSent: (state, _) => {
      state.deleteOven = UI_LOADING_STATE()
    },
    deleteOvenFailed: (state, { payload }) => {
      state.deleteOven = UI_ERROR_STATE(payload)
    },
    deleteOvenSucceed: (state, { payload }) => {
      state.deleteOven = UI_INIT_STATE()
      state.list = _.omit(state.list, payload.id)
    }
  }
})

export const actions = ovensSlice.actions
export default ovensSlice.reducer
