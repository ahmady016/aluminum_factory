import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers/request'

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    getOrders: UI_INIT_STATE(),
    getOrder: UI_INIT_STATE(),
    addOrder: UI_INIT_STATE(),
    updateOrder: UI_INIT_STATE(),
    deleteOrder: UI_INIT_STATE(),
    list: {}
  },
  reducers: {
    getOrdersSent: (state, _) => {
      state.getOrders = UI_LOADING_STATE()
    },
    getOrdersFailed: (state, { payload }) => {
      state.getOrders = UI_ERROR_STATE(payload)
    },
    getOrdersSucceed: (state, { payload }) => {
      state.getOrders = UI_INIT_STATE()
      state.list = _.mapKeys(payload, 'id')
    },
    getOrderSent: (state, _) => {
      state.getOrder = UI_LOADING_STATE()
    },
    getOrderFailed: (state, { payload }) => {
      state.getOrder = UI_ERROR_STATE(payload)
    },
    getOrderSucceed: (state, { payload }) => {
      state.getOrder = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    addOrderSent: (state, _) => {
      state.addOrder = UI_LOADING_STATE()
    },
    addOrderFailed: (state, { payload }) => {
      state.addOrder = UI_ERROR_STATE(payload)
    },
    addOrderSucceed: (state, { payload }) => {
      state.addOrder = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    updateOrderSent: (state, _) => {
      state.updateOrder = UI_LOADING_STATE()
    },
    updateOrderFailed: (state, { payload }) => {
      state.updateOrder = UI_ERROR_STATE(payload)
    },
    updateOrderSucceed: (state, { payload }) => {
      state.updateOrder = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    deleteOrderSent: (state, _) => {
      state.deleteOrder = UI_LOADING_STATE()
    },
    deleteOrderFailed: (state, { payload }) => {
      state.deleteOrder = UI_ERROR_STATE(payload)
    },
    deleteOrderSucceed: (state, { payload }) => {
      state.deleteOrder = UI_INIT_STATE()
      state.list = _.omit(state.list, payload.id)
    }
  }
})

export const actions = ordersSlice.actions
export default ordersSlice.reducer
