import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UI_INIT_STATE, UI_LOADING_STATE, UI_ERROR_STATE } from '../_helpers'

const customersSlice = createSlice({
	name: 'customers',
	initialState: {
		getCustomersUI: UI_INIT_STATE(),
		getCustomerUI: UI_INIT_STATE(),
		addCustomerUI: UI_INIT_STATE(),
		updateCustomerUI: UI_INIT_STATE(),
		deleteCustomerUI: UI_INIT_STATE(),
		list: {},
	},
	reducers: {
		getCustomersSent: (state, _) => {
			state.getCustomersUI = UI_LOADING_STATE()
		},
		getCustomersFailed: (state, { payload }) => {
			state.getCustomersUI = UI_ERROR_STATE(payload)
		},
		getCustomersSucceed: (state, { payload }) => {
			state.getCustomersUI = UI_INIT_STATE()
			state.list = _.mapKeys(payload, 'id')
		},
		getCustomerSent: (state, _) => {
			state.getCustomerUI = UI_LOADING_STATE()
		},
		getCustomerFailed: (state, { payload }) => {
			state.getCustomerUI = UI_ERROR_STATE(payload)
		},
		getCustomerSucceed: (state, { payload }) => {
			state.getCustomerUI = UI_INIT_STATE()
			state.list[payload.id] = payload
		},
		addCustomerSent: (state, _) => {
			state.addCustomerUI = UI_LOADING_STATE()
		},
		addCustomerFailed: (state, { payload }) => {
			state.addCustomerUI = UI_ERROR_STATE(payload)
		},
		addCustomerSucceed: (state, { payload }) => {
			state.addCustomerUI = UI_INIT_STATE()
			state.list[payload.id] = payload
		},
		updateCustomerSent: (state, _) => {
			state.updateCustomerUI = UI_LOADING_STATE()
		},
		updateCustomerFailed: (state, { payload }) => {
			state.updateCustomerUI = UI_ERROR_STATE(payload)
		},
		updateCustomerSucceed: (state, { payload }) => {
			state.updateCustomerUI = UI_INIT_STATE()
			state.list[payload.id] = payload
		},
		deleteCustomerSent: (state, _) => {
			state.deleteCustomerUI = UI_LOADING_STATE()
		},
		deleteCustomerFailed: (state, { payload }) => {
			state.deleteCustomerUI = UI_ERROR_STATE(payload)
		},
		deleteCustomerSucceed: (state, { payload }) => {
			state.deleteCustomerUI = UI_INIT_STATE()
			state.list = _.omit(state.list, payload.id)
		},
	},
})

export const actions = customersSlice.actions
export default customersSlice.reducer
