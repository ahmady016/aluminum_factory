/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { useSelector } from 'react-redux'
import request from '../_helpers/request'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'

import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const initialCustomerValues = {
	name: '',
	email: '',
	mobile: '',
	address: '',
	notes: '',
}

const customerValidation = Yup.object().shape({
	name: Yup.string()
		.required('Required')
		.min(2, 'Too Short Name')
		.max(50, 'Too Long Name'),
  email: Yup.string()
    .required('Required')
    .email('Not Valid Email'),
  mobile: Yup.string()
		.required('Required')
		.min(11, 'Short Mobile Number')
		.max(11, 'Long Mobile Number'),
  address: Yup.string()
		.required('Required')
		.min(5, 'Too Short Address')
		.max(1000, 'Too Long Address'),
	notes: Yup.string()
		.min(5, 'Too Short Notes')
		.max(1000, 'Too Long Notes'),
})

const handleSubmit = id => (values, { setSubmitting }) => {
	if(id)
		request({
			request: ['put', `/customers/${id}`, values],
			baseAction: 'customers/updateCustomer',
			redirectTo: '/customers',
			setSubmitting
		})
	else
		request({
			request: ['post', '/customers', values],
			baseAction: 'customers/addCustomer',
			redirectTo: '/customers',
			setSubmitting,
		})
}

function TheCustomerForm({ submitForm, isSubmitting, dirty, isValid }) {
  return (
		<Form className='mt-1'>
			<Grid container spacing={3}>
				<Grid item md={6} xs={12}>
					<Field
						type="text"
						name="name"
						label="Name"
						fullWidth
						component={TextField}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<Field
						type="text"
						name="email"
						label="Email"
						fullWidth
						component={TextField}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<Field
						type="text"
						name="mobile"
						label="Mobile"
						fullWidth
						component={TextField}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<Field
						type="text"
						name="address"
						label="Address"
            fullWidth
            multiline
						component={TextField}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<Field
						type="text"
						name="notes"
						label="Notes"
						fullWidth
						multiline
						component={TextField}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<Button
						className="w-100 mt-1"
						variant="contained"
						color="primary"
						disabled={!dirty || !isValid || isSubmitting}
            onClick={submitForm}
					>
						{isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
					</Button>
				</Grid>
			</Grid>
		</Form>
  )
}

function CustomerForm({ match: { params } }) {
	const { getCustomerUI, selectedCustomer } = useSelector( state => ({
    getCustomerUI: state.customers.getCustomerUI,
    selectedCustomer: state.customers.list[params.id],
  }))
  React.useEffect(() => {
      if(params.id && !selectedCustomer)
        request({
				request: ['get', `/customers/${params.id}`],
				baseAction: 'customers/getCustomer',
			})
    }, [])

	if (getCustomerUI.loading)
    return (
      <div className="w-100 h-100-vh flex-center">
        <CircularProgress disableShrink />
      </div>
    )

  else if (getCustomerUI.error)
		return (
				<Alert severity="error">{getCustomerUI.error.message || 'Something went wrong!'}</Alert>
		)

	return (
		<Formik
			initialValues={(params.id) ? selectedCustomer : initialCustomerValues}
			validationSchema={customerValidation}
			onSubmit={handleSubmit(params.id)}
			component={TheCustomerForm}
			enableReinitialize={true}
		/>
	)
}

export default CustomerForm
