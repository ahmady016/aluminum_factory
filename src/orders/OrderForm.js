/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { useSelector } from 'react-redux'
import request from '../_helpers/request'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Switch, TextField as FormikTextField } from 'formik-material-ui'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

let initialOrderValues = {
  status: 'Pending',
  serialNumber: '',
  customerId: '',
  dueDate: null,
  isPublic: false,
  notes: ''
}

const orderValidation = Yup.object().shape({
	customerId: Yup.object()
    .nullable()
    .required('Required'),
  dueDate: Yup.date()
    .nullable()
		.required('Required'),
  isPublic: Yup.boolean()
		.required('Required'),
	notes: Yup.string()
		.min(5, 'Too Short notes')
		.max(1000, 'Too Long notes'),
})

const handleSubmit = id => (values, { setSubmitting }) => {
	let valuesToPost = {
		...values,
		customerId: values?.customerId.id
  }
	console.log("values", values)
  console.log("valuesToPost", valuesToPost)
	if(id)
		request({
			request: ['put', `/orders/${id}`, valuesToPost],
			baseAction: 'orders/updateOrder',
			redirectTo: '/orders',
			setSubmitting
		})
	else
		request({
			request: ['post', '/orders', valuesToPost],
			baseAction: 'pistons/addOrder',
			redirectTo: '/orders',
			setSubmitting,
		})
}

function TheOrderForm({ orderId, resetForm, errors, touched, values, setFieldValue, setFieldTouched, submitForm, isSubmitting, dirty, isValid }) {
  const { getCustomersUI, customers, orders, selectedOrder } = useSelector(state => ({
		getCustomersUI: state.customers.getCustomersUI,
    customers: Object.values(state.customers.list).map(({ id, name }) => ({ id, name })),
    orders: Object.values(state.orders.list),
    selectedOrder: state.orders.list[orderId],
  }))

	React.useEffect(() => {
    if(!customers.length)
      request({
        request: ['get', '/customers'],
        baseAction: 'customers/getCustomers',
      })
    if(!orders.length)
			request({
				request: ['get', '/orders'],
				baseAction: 'orders/getOrders',
			})
		if(orderId && !selectedOrder)
			request({
				request: ['get', `/orders/${orderId}`],
				baseAction: 'orders/getOrder',
			})
  }, [])

	React.useEffect(() => {
		if (
			selectedOrder &&
      orders?.length &&
      customers?.length &&
			values.customerId === ''
			) {
				resetForm({
					values: {
            ...selectedOrder,
            serialNumber: `R${(orders.length || 0) + 1}`,
            customerId: customers.find(customer => customer.id === selectedOrder.customerId),
            dueDate: new Date(selectedOrder.dueDate)
					}
				})
		} else if (
      orders?.length &&
      values.serialNumber === ''
    ) {
      resetForm({
        values: {
          ...values,
          serialNumber: `R${orders.length + 1}`,
        }
      })
    }
	}, [selectedOrder, customers, orders])

  return (
		<Form className='mt-1'>
			<Grid container spacing={3}>
				{/* customerId */}
				<Grid item md={6} xs={12}>
					{getCustomersUI.loading
						? <div className="w-100 flex-center"><CircularProgress size={30} /></div>
						: <Autocomplete
								selectOnFocus
								forcePopupIcon
								id="customerId"
								name="customerId"
								options={customers}
								getOptionLabel={option => option.name || ''}
								value={values?.customerId}
								onChange={(_, value) => void setFieldValue('customerId', value)}
                onBlur={() => setFieldTouched('customerId', true)}
                disabled={isSubmitting}
								renderInput={params => (
									<TextField
										name="customerId"
										label="Customer"
										fullWidth
										{...params}
										inputProps={{ ...params.inputProps }}
										error={!!errors.customerId && touched.customerId}
										helperText={errors.customerId}
									/>
								)}
							/>
					}
				</Grid>
        {/* dueDate */}
				<Grid item md={6} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="dueDate"
              label="Due Date"
              format="dd/MM/yyyy"
              value={values.dueDate}
              onChange={value => setFieldValue("dueDate", value)}
              onBlur={_ => setFieldTouched('dueDate', true)}
              KeyboardButtonProps={{ "aria-label": "Change Due Date" }}
              error={!!errors.dueDate && touched.dueDate}
              helperText={errors.dueDate}
              disabled={isSubmitting}
              fullWidth
            />
          </MuiPickersUtilsProvider>
					{/* <Field
						name="dueDate"
            label="Due Date"
            format="dd/MM/yyyy"
						component={FormikKeyboardDatePicker}
            fullWidth
					/> */}
				</Grid>
        {/* notes */}
				<Grid item md={6} xs={12}>
					<Field
						type="text"
						name="notes"
						label="Notes"
						fullWidth
						multiline
						component={FormikTextField}
					/>
				</Grid>
        {/* isPublic */}
				<Grid item md={6} xs={12}>
          <FormControlLabel
            label="Public"
            control={
              <Field
                name="isPublic"
                color="primary"
                component={Switch}
                checked={values.isPublic}
                onChange={_ => setFieldValue('isPublic', !values.isPublic)}
                onBlur={_ => setFieldTouched('isPublic', true)}
                disabled={isSubmitting}
              />
            }
          />
				</Grid>
        {/* submit button */}
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

function OrderForm({ match: { params } }) {
	return (
    <Formik
      initialValues={initialOrderValues}
      validationSchema={orderValidation}
      onSubmit={handleSubmit(params.id)}
      children={props => <TheOrderForm {...props} orderId={params.id} />}
      enableReinitialize={true}
    />
	)
}

export default OrderForm
