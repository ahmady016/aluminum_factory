import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers'

const pistonsSlice = createSlice({
  name: 'pistons',
  initialState: {
    getPistonsUI: UI_INIT_STATE(),
    getPistonUI: UI_INIT_STATE(),
    addPistonUI: UI_INIT_STATE(),
    updatePistonUI: UI_INIT_STATE(),
    deletePistonUI: UI_INIT_STATE(),
    list: {}
  },
  reducers: {
    getPistonsSent: (state, _) => {
      state.getPistonsUI = UI_LOADING_STATE()
    },
    getPistonsFailed: (state, { payload }) => {
      state.getPistonsUI = UI_ERROR_STATE(payload)
    },
    getPistonsSucceed: (state, { payload }) => {
      state.getPistonsUI = UI_INIT_STATE()
      state.list = _.mapKeys(payload, 'id')
    },
    getPistonSent: (state, _) => {
      state.getPistonUI = UI_LOADING_STATE()
    },
    getPistonFailed: (state, { payload }) => {
      state.getPistonUI = UI_ERROR_STATE(payload)
    },
    getPistonSucceed: (state, { payload }) => {
      state.getPistonUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    addPistonSent: (state, _) => {
      state.addPistonUI = UI_LOADING_STATE()
    },
    addPistonFailed: (state, { payload }) => {
      state.addPistonUI = UI_ERROR_STATE(payload)
    },
    addPistonSucceed: (state, { payload }) => {
      state.addPistonUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    updatePistonSent: (state, _) => {
      state.updatePistonUI = UI_LOADING_STATE()
    },
    updatePistonFailed: (state, { payload }) => {
      state.updatePistonUI = UI_ERROR_STATE(payload)
    },
    updatePistonSucceed: (state, { payload }) => {
      state.updatePistonUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    deletePistonSent: (state, _) => {
      state.deletePistonUI = UI_LOADING_STATE()
    },
    deletePistonFailed: (state, { payload }) => {
      state.deletePistonUI = UI_ERROR_STATE(payload)
    },
    deletePistonSucceed: (state, { payload }) => {
      state.deletePistonUI = UI_INIT_STATE()
      state.list = _.omit(state.list, payload.id)
    }
  }
})

export const actions = pistonsSlice.actions
export default pistonsSlice.reducer
