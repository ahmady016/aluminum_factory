/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { useSelector } from 'react-redux'
import request from '../_helpers/request'

import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField, RadioGroup } from 'formik-material-ui'

import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'

let initialCageValues = {
  name: '',
  type: '',
  notes: '',
}

const cageValidation = Yup.object().shape({
	name: Yup.string()
		.required('Required')
		.min(2, 'Too Short Name')
		.max(50, 'Too Long Name'),
  type: Yup.string()
		.required('Required')
    .oneOf(['Piston', 'Paint'], 'must be one of [Piston, Paint]'),
	notes: Yup.string()
		.min(5, 'Too Short notes')
		.max(1000, 'Too Long notes'),
})

const handleSubmit = id => (values, { setSubmitting }) => {
	console.log("values", values)
	if(id)
		request({
			request: ['put', `/cages/${id}`, values],
			baseAction: 'cages/updateCage',
			redirectTo: '/cages',
			setSubmitting
		})
	else
		request({
			request: ['post', '/cages', values],
			baseAction: 'cages/addCage',
			redirectTo: '/cages',
			setSubmitting,
		})
}

function TheCageForm({ values, submitForm, isSubmitting, dirty, isValid }) {
  console.log("TheCageForm -> values", values)
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
				{/* type */}
				<Grid item md={6} xs={12}>
          <Field name="type" component={RadioGroup} row>
            <FormControlLabel
              value="Piston"
              label="Piston"
              control={<Radio disabled={isSubmitting} />}
              disabled={isSubmitting}
            />
            <FormControlLabel
              value="Paint"
              label="Paint"
              control={<Radio disabled={isSubmitting} />}
              disabled={isSubmitting}
            />
          </Field>
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

function CageForm({ match: { params } }) {
  const { getCageUI, selectedCage } = useSelector( state => ({
    getCageUI: state.cages.getCageUI,
    selectedCage: state.cages.list[params.id],
  }))

  React.useEffect(() => {
      if(params.id && !selectedCage)
        request({
				request: ['get', `/cages/${params.id}`],
				baseAction: 'cages/getCage',
			})
    }, [])

  if (getCageUI.loading)
    return (
      <div className="w-100 h-100-vh flex-center">
        <CircularProgress disableShrink />
      </div>
    )

  else if (getCageUI.error)
		return (
				<Alert severity="error">{getCageUI.error.message || 'Something went wrong!'}</Alert>
		)

	return (
		<Formik
			initialValues={(params.id) ? selectedCage : initialCageValues}
			validationSchema={cageValidation}
			onSubmit={handleSubmit(params.id)}
			component={TheCageForm}
			enableReinitialize={true}
		/>
	)
}

export default CageForm
