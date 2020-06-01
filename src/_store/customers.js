import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers'

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    getCustomers: UI_INIT_STATE(),
    getCustomer: UI_INIT_STATE(),
    addCustomer: UI_INIT_STATE(),
    updateCustomer: UI_INIT_STATE(),
    deleteCustomer: UI_INIT_STATE(),
    list: {}
  },
  reducers: {
    getCustomersSent: (state, _) => {
      state.getCustomers = UI_LOADING_STATE()
    },
    getCustomersFailed: (state, { payload }) => {
      state.getCustomers = UI_ERROR_STATE(payload)
    },
    getCustomersSucceed: (state, { payload }) => {
      state.getCustomers = UI_INIT_STATE()
      state.list = _.mapKeys(payload, 'id')
    },
    getCustomerSent: (state, _) => {
      state.getCustomer = UI_LOADING_STATE()
    },
    getCustomerFailed: (state, { payload }) => {
      state.getCustomer = UI_ERROR_STATE(payload)
    },
    getCustomerSucceed: (state, { payload }) => {
      state.getCustomer = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    addCustomerSent: (state, _) => {
      state.addCustomer = UI_LOADING_STATE()
    },
    addCustomerFailed: (state, { payload }) => {
      state.addCustomer = UI_ERROR_STATE(payload)
    },
    addCustomerSucceed: (state, { payload }) => {
      state.addCustomer = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    updateCustomerSent: (state, _) => {
      state.updateCustomer = UI_LOADING_STATE()
    },
    updateCustomerFailed: (state, { payload }) => {
      state.updateCustomer = UI_ERROR_STATE(payload)
    },
    updateCustomerSucceed: (state, { payload }) => {
      state.updateCustomer = UI_INIT_STATE()
      state.list[payload.id] = payload
    },
    deleteCustomerSent: (state, _) => {
      state.deleteCustomer = UI_LOADING_STATE()
    },
    deleteCustomerFailed: (state, { payload }) => {
      state.deleteCustomer = UI_ERROR_STATE(payload)
    },
    deleteCustomerSucceed: (state, { payload }) => {
      state.deleteCustomer = UI_INIT_STATE()
      state.list = _.omit(state.list, payload.id)
    }
  }
})

export const actions = customersSlice.actions
export default customersSlice.reducer
