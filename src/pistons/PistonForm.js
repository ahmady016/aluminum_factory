/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { useSelector } from 'react-redux'
import request from '../_helpers/request'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

let selectedPiston
const initialPistonValues = {
	name: '',
	sticksCapacity: '',
	diameterByMM: '',
	avgWeightForCM: '',
	notes: '',
}

const pistonValidation = Yup.object().shape({
	name: Yup.string()
		.required('Required')
		.min(2, 'Too Short Name')
		.max(50, 'Too Long Name'),
	sticksCapacity: Yup.number()
		.required('Required')
		.min(2, 'Too Short sticks Capacity')
		.max(20, 'Too Long sticks Capacity'),
	diameterByMM: Yup.number()
		.required('Required')
		.min(50, 'Too Short diameter')
		.max(999, 'Too Long diameter'),
	avgWeightForCM: Yup.number()
		.required('Required')
		.min(0.1, 'Too Short Average Weight')
		.max(10, 'Too Long Average Weight'),
	notes: Yup.string()
		.min(5, 'Too Short notes')
		.max(1000, 'Too Long notes'),
})

const handleSubmit = id => (values, { setSubmitting }) => {
	if(id)
		request({
			request: ['put', `/pistons/${id}`, values],
			baseAction: 'pistons/updatePiston',
			redirectTo: '/pistons',
			setSubmitting
		})
	else
		request({
			request: ['post', '/pistons', values],
			baseAction: 'pistons/addPiston',
			redirectTo: '/pistons',
			setSubmitting,
		})
}

function ThePistonForm({ submitForm, isSubmitting, dirty, isValid }) {
	return (
		<Form>
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
						type="number"
						name="diameterByMM"
						label="Diameter (MM)"
						fullWidth
						component={TextField}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<Field
						type="number"
						name="avgWeightForCM"
						label="Average Weight For CM"
						fullWidth
						component={TextField}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<Field
						type="number"
						name="sticksCapacity"
						label="Sticks Capacity"
						fullWidth
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

function PistonForm({ match: { params } }) {
	selectedPiston = useSelector( state => state.pistons.list[params.id])
  React.useEffect(
    () => {
      if(params.id && !selectedPiston)
        request({
				request: ['get', `/pistons/${params.id}`],
				baseAction: 'pistons/getPiston',
			})
    },
    []
	)

	return (
		<Formik
			initialValues={(params.id) ? selectedPiston : initialPistonValues}
			validationSchema={pistonValidation}
			onSubmit={handleSubmit(params.id)}
			component={ThePistonForm}
		/>
	)
}

export default PistonForm
