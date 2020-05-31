import axios from 'axios'
import { store } from '../_store'
import { history } from '../index'

// build request and send it to the server and return the data OR error
const BASE_URL = 'http://localhost:52078/api'
let error
async function _send(request) {
	try {
    if (!Array.isArray(request))
      throw new Error('invalid request!!!')
		const [method, url, body = null, config = null] = request
		const { data } = await axios[method](BASE_URL + url, body, config)
		return { status: 'success', response: data.data }
	} catch (err) {
		// The request was made and the server responded with a status code that falls out of the range of 2xx
		// error.response.data - error.response.status - error.response.headers
		if (err.response)
			return { status: 'error', response: err.response.data || err.response.status }
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
		else if (err.request && Object.keys(err.request).length)
			return { status: 'error', response: err.request }
		// Something happened in setting up the request that triggered an Error
		else {
			error = JSON.parse(JSON.stringify(err))
			return { status: 'error', response: error.message || 'Something went wrong!' }
		}
	}
}

export default async function request({ request, baseAction, onSuccessAction, redirectTo, resultMapper }) {
  store.dispatch({ type: `${baseAction}Sent` })
  let { status, response } = await _send(request)
  if (status === 'success') {
		if(request[0] === 'delete')
			response = { id: request[2] }

		if(resultMapper)
			response = resultMapper(response)

		if(onSuccessAction && Array.isArray(onSuccessAction))
			onSuccessAction.forEach(action => void store.dispatch({ type: action, payload: response }))
		else
			store.dispatch({ type: onSuccessAction || `${baseAction}Succeed`, payload: response })

		if(typeof redirectTo === 'string')
			history.push(redirectTo)
		else if(typeof redirectTo === 'function')
			history.push(redirectTo(response))
	}
	else if (status === 'error')
    store.dispatch({ type: `${baseAction}Failed`,  payload: response })
}

// Sent, Succeed, Failed Actions Names Conventions
export const UI_INIT_STATE = () => ({ loading: false, error: null })
export const UI_LOADING_STATE = () => ({ loading: true, error: null })
export const UI_ERROR_STATE = (error) => ({ loading: false, error: error })

export const toQueryString = (values) => {
	return Object.entries(values)
		.map(([key, value]) => {
			if(Array.isArray(value))
				return value.map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
										.join('&')
			else
				return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
		})
		.join('&')
}