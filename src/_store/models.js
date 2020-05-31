import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers/request'

const modelsSlice = createSlice({
  name: 'models',
  initialState: {
    getModels: UI_INIT_STATE(),
    getModel: UI_INIT_STATE(),
    addModel: UI_INIT_STATE(),
    updateModel: UI_INIT_STATE(),
    deleteModel: UI_INIT_STATE(),
    list: {}
  },
  reducers: {
    getModelsSent: (state, _) => {
      state.getModels = UI_LOADING_STATE()
    },
    getModelsFailed: (state, { payload }) => {
      state.getModels = UI_ERROR_STATE(payload)
    },
    getModelsSucceed: (state, { payload }) => {
      state.getModels = UI_INIT_STATE()
      state.list = _.mapKeys(payload, 'id')
    },
    getModelSent: (state, _) => {
      state.getModel = UI_LOADING_STATE()
    },
    getModelFailed: (state, { payload }) => {
      state.getModel = UI_ERROR_STATE(payload)
    },
    getModelSucceed: (state, { payload }) => {
      state.getModel = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    addModelSent: (state, _) => {
      state.addModel = UI_LOADING_STATE()
    },
    addModelFailed: (state, { payload }) => {
      state.addModel = UI_ERROR_STATE(payload)
    },
    addModelSucceed: (state, { payload }) => {
      state.addModel = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    updateModelSent: (state, _) => {
      state.updateModel = UI_LOADING_STATE()
    },
    updateModelFailed: (state, { payload }) => {
      state.updateModel = UI_ERROR_STATE(payload)
    },
    updateModelSucceed: (state, { payload }) => {
      state.updateModel = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    deleteModelSent: (state, _) => {
      state.deleteModel = UI_LOADING_STATE()
    },
    deleteModelFailed: (state, { payload }) => {
      state.deleteModel = UI_ERROR_STATE(payload)
    },
    deleteModelSucceed: (state, { payload }) => {
      state.deleteModel = UI_INIT_STATE()
      state.list = _.omit(state.list, payload.id)
    }
  }
})

export const actions = modelsSlice.actions
export default modelsSlice.reducer
