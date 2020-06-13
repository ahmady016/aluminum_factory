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

let initialOvenValues = {
  name: '',
  cagesCapacity: '',
  notes: '',
}

const ovenValidation = Yup.object().shape({
	name: Yup.string()
		.required('Required')
		.min(2, 'Too Short Name')
		.max(50, 'Too Long Name'),
  cagesCapacity: Yup.number()
		.required('Required')
		.min(1, 'Too Short Cages Capacity')
		.max(15, 'Too Long Cages Capacity'),
	notes: Yup.string()
		.min(5, 'Too Short notes')
		.max(1000, 'Too Long notes'),
})

const handleSubmit = id => (values, { setSubmitting }) => {
	console.log("values", values)
	if(id)
		request({
			request: ['put', `/ovens/${id}`, values],
			baseAction: 'ovens/updateOven',
			redirectTo: '/ovens',
			setSubmitting
		})
	else
		request({
			request: ['post', '/ovens', values],
			baseAction: 'ovens/addOven',
			redirectTo: '/ovens',
			setSubmitting,
		})
}

function TheOvenForm({ submitForm, isSubmitting, dirty, isValid }) {
  return (
		<Form className='mt-1'>
			<Grid container spacing={3}>
				{/* name */}
				<Grid item md={6} xs={12}>
					<Field
						type="text"
						name="name"
						label="Name"
						component={TextField}
						fullWidth
					/>
				</Grid>
				{/* holesCount */}
				<Grid item md={6} xs={12}>
					<Field
						type="number"
						name="cagesCapacity"
						label="Cages Capacity"
						component={TextField}
						fullWidth
					/>
				</Grid>
				{/* notes */}
				<Grid item md={6} xs={12}>
					<Field
						type="text"
						name="notes"
						label="Notes"
						component={TextField}
						fullWidth
						multiline
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

function OvenForm({ match: { params } }) {
	const { getOvenUI, selectedOven } = useSelector( state => ({
    getOvenUI: state.ovens.getOvenUI,
    selectedOven: state.ovens.list[params.id],
  }))
  React.useEffect(() => {
      if(params.id && !selectedOven)
        request({
				request: ['get', `/ovens/${params.id}`],
				baseAction: 'ovens/getOven',
			})
    }, [])

	if (getOvenUI.loading)
    return (
      <div className="w-100 h-100-vh flex-center">
        <CircularProgress disableShrink />
      </div>
    )

  else if (getOvenUI.error)
		return (
				<Alert severity="error">{getOvenUI.error.message || 'Something went wrong!'}</Alert>
		)

	return (
		<Formik
			initialValues={(params.id) ? selectedOven : initialOvenValues}
			validationSchema={ovenValidation}
			onSubmit={handleSubmit(params.id)}
			component={TheOvenForm}
			enableReinitialize={true}
		/>
	)
}

export default OvenForm
