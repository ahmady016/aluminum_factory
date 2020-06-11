import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers'

const modelsSlice = createSlice({
  name: 'models',
  initialState: {
    getModelsUI: UI_INIT_STATE(),
    getModelUI: UI_INIT_STATE(),
    addModelUI: UI_INIT_STATE(),
    updateModelUI: UI_INIT_STATE(),
    deleteModelUI: UI_INIT_STATE(),
    list: {}
  },
  reducers: {
    getModelsSent: (state, _) => {
      state.getModelsUI = UI_LOADING_STATE()
    },
    getModelsFailed: (state, { payload }) => {
      state.getModelsUI = UI_ERROR_STATE(payload)
    },
    getModelsSucceed: (state, { payload }) => {
      state.getModelsUI = UI_INIT_STATE()
      state.list = _.mapKeys(payload, 'id')
    },
    getModelSent: (state, _) => {
      state.getModelUI = UI_LOADING_STATE()
    },
    getModelFailed: (state, { payload }) => {
      state.getModelUI = UI_ERROR_STATE(payload)
    },
    getModelSucceed: (state, { payload }) => {
      state.getModelUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    addModelSent: (state, _) => {
      state.addModelUI = UI_LOADING_STATE()
    },
    addModelFailed: (state, { payload }) => {
      state.addModelUI = UI_ERROR_STATE(payload)
    },
    addModelSucceed: (state, { payload }) => {
      state.addModelUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    updateModelSent: (state, _) => {
      state.updateModelUI = UI_LOADING_STATE()
    },
    updateModelFailed: (state, { payload }) => {
      state.updateModelUI = UI_ERROR_STATE(payload)
    },
    updateModelSucceed: (state, { payload }) => {
      state.updateModelUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    deleteModelSent: (state, _) => {
      state.deleteModelUI = UI_LOADING_STATE()
    },
    deleteModelFailed: (state, { payload }) => {
      state.deleteModelUI = UI_ERROR_STATE(payload)
    },
    deleteModelSucceed: (state, { payload }) => {
      state.deleteModelUI = UI_INIT_STATE()
      state.list = _.omit(state.list, payload.id)
    }
  }
})

export const actions = modelsSlice.actions
export default modelsSlice.reducer
