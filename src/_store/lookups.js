import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers'

const lookupsSlice = createSlice({
  name: 'lookups',
  initialState: {
    getStripsUI: UI_INIT_STATE(),
    getLengthsUI: UI_INIT_STATE(),
    getColorsUI: UI_INIT_STATE(),
    getHardnessesUI: UI_INIT_STATE(),
    getModelTypesUI: UI_INIT_STATE(),
    getCageTypesUI: UI_INIT_STATE(),
    strips: {},
    lengths: {},
    colors: {},
    hardnesses: {},
    modelTypes: {},
    cageTypes: {}
  },
  reducers: {
    getStripsSent: (state, _) => {
      state.getStripsUI = UI_LOADING_STATE()
    },
    getStripsFailed: (state, { payload }) => {
      state.getStripsUI = UI_ERROR_STATE(payload)
    },
    getStripsSucceed: (state, { payload }) => {
      state.getStripsUI = UI_INIT_STATE()
      state.strips = _.mapKeys(payload, 'id')
    },
    getLengthsSent: (state, _) => {
      state.getLengthsUI = UI_LOADING_STATE()
    },
    getLengthsFailed: (state, { payload }) => {
      state.getLengthsUI = UI_ERROR_STATE(payload)
    },
    getLengthsSucceed: (state, { payload }) => {
      state.getLengthsUI = UI_INIT_STATE()
      state.lengths = _.mapKeys(payload, 'id')
    },
    getColorsSent: (state, _) => {
      state.getColorsUI = UI_LOADING_STATE()
    },
    getColorsFailed: (state, { payload }) => {
      state.getColorsUI = UI_ERROR_STATE(payload)
    },
    getColorsSucceed: (state, { payload }) => {
      state.getColorsUI = UI_INIT_STATE()
      state.colors = _.mapKeys(payload, 'id')
    },
    getHardnessesSent: (state, _) => {
      state.getHardnessesUI = UI_LOADING_STATE()
    },
    getHardnessesFailed: (state, { payload }) => {
      state.getHardnessesUI = UI_ERROR_STATE(payload)
    },
    getHardnessesSucceed: (state, { payload }) => {
      state.getHardnessesUI = UI_INIT_STATE()
      state.hardnesses = _.mapKeys(payload, 'id')
    },
    getModelTypesSent: (state, _) => {
      state.getModelTypesUI = UI_LOADING_STATE()
    },
    getModelTypesFailed: (state, { payload }) => {
      state.getModelTypesUI = UI_ERROR_STATE(payload)
    },
    getModelTypesSucceed: (state, { payload }) => {
      state.getModelTypesUI = UI_INIT_STATE()
      state.modelTypes = _.mapKeys(payload, 'id')
    },
    getCageTypesSent: (state, _) => {
      state.getCageTypesUI = UI_LOADING_STATE()
    },
    getCageTypesFailed: (state, { payload }) => {
      state.getCageTypesUI = UI_ERROR_STATE(payload)
    },
    getCageTypesSucceed: (state, { payload }) => {
      state.getCageTypesUI = UI_INIT_STATE()
      state.cageTypes = _.mapKeys(payload, 'id')
    },
  }
})

export const actions = { ...lookupsSlice.actions }
export default lookupsSlice.reducer
