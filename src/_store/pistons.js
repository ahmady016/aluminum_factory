import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers/request'

const pistonsSlice = createSlice({
  name: 'pistons',
  initialState: {
    getPistons: UI_INIT_STATE(),
    getPiston: UI_INIT_STATE(),
    addPiston: UI_INIT_STATE(),
    updatePiston: UI_INIT_STATE(),
    deletePiston: UI_INIT_STATE(),
    list: {}
  },
  reducers: {
    getPistonsSent: (state, _) => {
      state.getPistons = UI_LOADING_STATE()
    },
    getPistonsFailed: (state, { payload }) => {
      state.getPistons = UI_ERROR_STATE(payload)
    },
    getPistonsSucceed: (state, { payload }) => {
      state.getPistons = UI_INIT_STATE()
      state.list = _.mapKeys(payload, 'id')
    },
    getPistonSent: (state, _) => {
      state.getPiston = UI_LOADING_STATE()
    },
    getPistonFailed: (state, { payload }) => {
      state.getPiston = UI_ERROR_STATE(payload)
    },
    getPistonSucceed: (state, { payload }) => {
      state.getPiston = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    addPistonSent: (state, _) => {
      state.addPiston = UI_LOADING_STATE()
    },
    addPistonFailed: (state, { payload }) => {
      state.addPiston = UI_ERROR_STATE(payload)
    },
    addPistonSucceed: (state, { payload }) => {
      state.addPiston = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    updatePistonSent: (state, _) => {
      state.updatePiston = UI_LOADING_STATE()
    },
    updatePistonFailed: (state, { payload }) => {
      state.updatePiston = UI_ERROR_STATE(payload)
    },
    updatePistonSucceed: (state, { payload }) => {
      state.updatePiston = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    deletePistonSent: (state, _) => {
      state.deletePiston = UI_LOADING_STATE()
    },
    deletePistonFailed: (state, { payload }) => {
      state.deletePiston = UI_ERROR_STATE(payload)
    },
    deletePistonSucceed: (state, { payload }) => {
      state.deletePiston = UI_INIT_STATE()
      state.list = _.omit(state.list, payload.id)
    }
  }
})

export const actions = pistonsSlice.actions
export default pistonsSlice.reducer
