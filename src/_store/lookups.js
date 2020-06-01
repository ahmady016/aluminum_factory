import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers'

const lookupsSlice = createSlice({
  name: 'lookups',
  initialState: {
    stripsUI: UI_INIT_STATE(),
    lengthsUI: UI_INIT_STATE(),
    colorsUI: UI_INIT_STATE(),
    hardnessesUI: UI_INIT_STATE(),
    strips: {},
    lengths: {},
    colors: {},
    hardnesses: {}
  },
  reducers: {
    stripsSent: (state, _) => {
      state.stripsUI = UI_LOADING_STATE()
    },
    stripsFailed: (state, { payload }) => {
      state.stripsUI = UI_ERROR_STATE(payload)
    },
    stripsSucceed: (state, { payload }) => {
      state.stripsUI = UI_INIT_STATE()
      state.strips = _.mapKeys(payload, 'id')
    },
    lengthsSent: (state, _) => {
      state.lengthsUI = UI_LOADING_STATE()
    },
    lengthsFailed: (state, { payload }) => {
      state.lengthsUI = UI_ERROR_STATE(payload)
    },
    lengthsSucceed: (state, { payload }) => {
      state.lengthsUI = UI_INIT_STATE()
      state.lengths = _.mapKeys(payload, 'id')
    }
  }
})

export const actions = { ...lookupsSlice.actions }
export default lookupsSlice.reducer
