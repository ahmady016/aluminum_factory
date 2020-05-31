import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers/request'

const cagesSlice = createSlice({
  name: 'cages',
  initialState: {
    getCages: UI_INIT_STATE(),
    getCage: UI_INIT_STATE(),
    addCage: UI_INIT_STATE(),
    updateCage: UI_INIT_STATE(),
    deleteCage: UI_INIT_STATE(),
    list: {}
  },
  reducers: {
    getCagesSent: (state, _) => {
      state.getCages = UI_LOADING_STATE()
    },
    getCagesFailed: (state, { payload }) => {
      state.getCages = UI_ERROR_STATE(payload)
    },
    getCagesSucceed: (state, { payload }) => {
      state.getCages = UI_INIT_STATE()
      state.list = _.mapKeys(payload, 'id')
    },
    getCageSent: (state, _) => {
      state.getCage = UI_LOADING_STATE()
    },
    getCageFailed: (state, { payload }) => {
      state.getCage = UI_ERROR_STATE(payload)
    },
    getCageSucceed: (state, { payload }) => {
      state.getCage = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    addCageSent: (state, _) => {
      state.addCage = UI_LOADING_STATE()
    },
    addCageFailed: (state, { payload }) => {
      state.addCage = UI_ERROR_STATE(payload)
    },
    addCageSucceed: (state, { payload }) => {
      state.addCage = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    updateCageSent: (state, _) => {
      state.updateCage = UI_LOADING_STATE()
    },
    updateCageFailed: (state, { payload }) => {
      state.updateCage = UI_ERROR_STATE(payload)
    },
    updateCageSucceed: (state, { payload }) => {
      state.updateCage = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    deleteCageSent: (state, _) => {
      state.deleteCage = UI_LOADING_STATE()
    },
    deleteCageFailed: (state, { payload }) => {
      state.deleteCage = UI_ERROR_STATE(payload)
    },
    deleteCageSucceed: (state, { payload }) => {
      state.deleteCage = UI_INIT_STATE()
      state.list = _.omit(state.list, payload.id)
    }
  }
})

export const actions = cagesSlice.actions
export default cagesSlice.reducer
