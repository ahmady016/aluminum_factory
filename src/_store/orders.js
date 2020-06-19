import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers'

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    getOrdersUI: UI_INIT_STATE(),
    getOrderUI: UI_INIT_STATE(),
    getOrderDetailsUI: UI_INIT_STATE(),
    addOrderUI: UI_INIT_STATE(),
    updateOrderUI: UI_INIT_STATE(),
    deleteOrderUI: UI_INIT_STATE(),
    deleteOrderDetailUI: UI_INIT_STATE(),
    list: {}
  },
  reducers: {
    getOrdersSent: (state, _) => {
      state.getOrdersUI = UI_LOADING_STATE()
    },
    getOrdersFailed: (state, { payload }) => {
      state.getOrdersUI = UI_ERROR_STATE(payload)
    },
    getOrdersSucceed: (state, { payload }) => {
      state.getOrdersUI = UI_INIT_STATE()
      state.list = _.mapKeys(payload, 'id')
    },
    getOrderDetailsSent: (state, _) => {
      state.getOrderDetailsUI = UI_LOADING_STATE()
    },
    getOrderDetailsFailed: (state, { payload }) => {
      state.getOrderDetailsUI = UI_ERROR_STATE(payload)
    },
    getOrderDetailsSucceed: (state, { payload }) => {
      state.getOrderDetailsUI = UI_INIT_STATE()
      state.list[payload[0].orderId].orderDetails = _.mapKeys(payload, 'id')
    },
    getOrderSent: (state, _) => {
      state.getOrderUI = UI_LOADING_STATE()
    },
    getOrderFailed: (state, { payload }) => {
      state.getOrderUI = UI_ERROR_STATE(payload)
    },
    getOrderSucceed: (state, { payload }) => {
      state.getOrderUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    addOrderSent: (state, _) => {
      state.addOrderUI = UI_LOADING_STATE()
    },
    addOrderFailed: (state, { payload }) => {
      state.addOrderUI = UI_ERROR_STATE(payload)
    },
    addOrderSucceed: (state, { payload }) => {
      state.addOrderUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    updateOrderSent: (state, _) => {
      state.updateOrderUI = UI_LOADING_STATE()
    },
    updateOrderFailed: (state, { payload }) => {
      state.updateOrderUI = UI_ERROR_STATE(payload)
    },
    updateOrderSucceed: (state, { payload }) => {
      state.updateOrderUI = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    deleteOrderSent: (state, _) => {
      state.deleteOrderUI = UI_LOADING_STATE()
    },
    deleteOrderFailed: (state, { payload }) => {
      state.deleteOrderUI = UI_ERROR_STATE(payload)
    },
    deleteOrderSucceed: (state, { payload }) => {
      state.deleteOrderUI = UI_INIT_STATE()
      state.list = _.omit(state.list, payload.id)
    },
    deleteOrderDetailSent: (state, _) => {
      state.deleteOrderDetailUI = UI_LOADING_STATE()
    },
    deleteOrderDetailFailed: (state, { payload }) => {
      state.deleteOrderDetailUI = UI_ERROR_STATE(payload)
    },
    deleteOrderDetailSucceed: (state, { payload }) => {
      state.deleteOrderDetailUI = UI_INIT_STATE()
      state.list[payload.orderId].orderDetails = _.omit(state.list[payload.orderId], payload.id)
    }
  }
})

export const actions = ordersSlice.actions
export default ordersSlice.reducer
