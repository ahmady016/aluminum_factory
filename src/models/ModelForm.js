/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { useSelector } from 'react-redux'
import request from '../_helpers/request'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { TextField as FormikTextField } from 'formik-material-ui'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

let initialModelValues = {
  name: '',
  strip: '',
  type: '',
  pistonId: '',
  holesCount: '',
  thicknessByMM: '',
  meterWeight: '',
  notes: '',
}

const modelValidation = Yup.object().shape({
	strip: Yup.object()
		.nullable()
		.required('Required'),
	type: Yup.object()
		.nullable()
		.required('Required'),
	pistonId: Yup.object()
		.nullable()
		.required('Required'),
	name: Yup.string()
		.required('Required')
		.min(2, 'Too Short Name')
		.max(50, 'Too Long Name'),
  holesCount: Yup.number()
		.required('Required')
		.min(1, 'Too Short sticks Capacity')
		.max(15, 'Too Long sticks Capacity'),
  thicknessByMM: Yup.number()
		.required('Required')
		.min(50, 'Too Short diameter')
		.max(999, 'Too Long diameter'),
  meterWeight: Yup.number()
		.required('Required')
		.min(0.1, 'Too Short Average Weight')
		.max(10, 'Too Long Average Weight'),
	notes: Yup.string()
		.min(5, 'Too Short notes')
		.max(1000, 'Too Long notes'),
})

const handleSubmit = id => (values, { setSubmitting }) => {
	let valuesToPost = {
		...values,
		strip: values?.strip.name,
		type: values?.type.name,
		pistonId: values?.pistonId.id
	}
	console.log("values", values)
  console.log("valuesToPost", valuesToPost)
	if(id)
		request({
			request: ['put', `/models/${id}`, valuesToPost],
			baseAction: 'models/updateModel',
			redirectTo: '/models',
			setSubmitting
		})
	else
		request({
			request: ['post', '/models', valuesToPost],
			baseAction: 'pistons/addModel',
			redirectTo: '/models',
			setSubmitting,
		})
}

function TheModelForm({ modelId, resetForm, errors, touched, values, setFieldValue, setFieldTouched, submitForm, isSubmitting, dirty, isValid }) {
  console.log("TheModelForm -> modelId", modelId)
	console.log("TheModelForm -> values", values)

	let { models, selectedModel } = useSelector( state => ({
		models: Object.values(state.models.list),
		selectedModel: state.models.list[modelId]
	}))
	const { getStripsUI, strips, getModelTypesUI, modelTypes, getPistonsUI, pistons } = useSelector((state) => ({
		getStripsUI: state.lookups.getStripsUI,
		strips: Object.values(state.lookups.strips),
		getModelTypesUI: state.lookups.getModelTypesUI,
		modelTypes: Object.values(state.lookups.modelTypes),
		getPistonsUI: state.pistons.getPistonsUI,
		pistons: Object.values(state.pistons.list).map(({ id, name }) => ({ id, name })),
	}))

	React.useEffect(() => {
		request({
			request: ['get', '/strips'],
			baseAction: 'lookups/getStrips',
		})
		request({
			request: ['get', '/modelTypes'],
			baseAction: 'lookups/getModelTypes',
		})
		request({
			request: ['get', '/pistons'],
			baseAction: 'pistons/getPistons',
		})
		if(modelId && !selectedModel)
			request({
				request: ['get', `/models/${modelId}`],
				baseAction: 'models/getModel',
			})
		if(!models.length)
			request({
				request: ['get', '/models'],
				baseAction: 'models/getModels',
			})
	}, [])

	React.useEffect(() => {
		if (
			selectedModel &&
			strips?.length &&
			modelTypes?.length &&
			pistons?.length &&
			values.name === ''
			) {
				resetForm({
					values: {
						...selectedModel,
						strip: 		strips.find(strip => strip.name === selectedModel.strip),
						type: 		modelTypes.find(type => type.name === selectedModel.type),
						pistonId: pistons.find(piston => piston.id === selectedModel.pistonId)
					}
				})
		}
	}, [selectedModel, strips, modelTypes, pistons])

	React.useEffect(() => {
		console.log("models", models)
		if(values.strip && models?.length) {
			let thisStripModels = models.filter(model => model.strip === values.strip.name)
      console.log("thisStripModels", thisStripModels)
			setFieldValue('name', `${values.strip.name}/${thisStripModels.length + 1}`)
		}
	}, [values.strip])

  return (
		<Form className='mt-1'>
			<Grid container spacing={3}>
				{/* strip */}
				<Grid item md={6} xs={12}>
					{getStripsUI.loading
						? <div className="w-100 flex-center"><CircularProgress size={30} /></div>
						: <Autocomplete
								selectOnFocus
								forcePopupIcon
								id="strip"
								name="strip"
								autoSelect
								options={strips}
								getOptionLabel={option => option.name || ''}
								value={values?.strip}
								onChange={(_, value) => void setFieldValue('strip', value)}
								onBlur={() => setFieldTouched('strip', true)}
								renderInput={params => (
									<TextField
										name="strip"
										label="Strip"
										fullWidth
										{...params}
										inputProps={{ ...params.inputProps }}
										error={!!errors.strip && touched.strip}
										helperText={errors.strip}
									/>
								)}
							/>
					}
				</Grid>
				{/* type */}
				<Grid item md={6} xs={12}>
					{getModelTypesUI.loading
						? <div className="w-100 flex-center"><CircularProgress size={30} /></div>
						: <Autocomplete
								selectOnFocus
								forcePopupIcon
								id="type"
								name="type"
								options={modelTypes}
								getOptionLabel={option => option.name || ''}
								value={values?.type}
								onChange={(_, value) => void setFieldValue('type', value)}
								onBlur={() => setFieldTouched('type', true)}
								renderInput={params => (
									<TextField
										name="type"
										label="Type"
										fullWidth
										{...params}
										inputProps={{ ...params.inputProps }}
										error={!!errors.type && touched.type}
										helperText={errors.type}
									/>
								)}
							/>
					}
				</Grid>
				{/* pistonId */}
				<Grid item md={6} xs={12}>
					{getPistonsUI.loading
						? <div className="w-100 flex-center"><CircularProgress size={30} /></div>
						: <Autocomplete
								selectOnFocus
								forcePopupIcon
								id="pistonId"
								name="pistonId"
								options={pistons}
								getOptionLabel={option => option.name || ''}
								value={values?.pistonId}
								onChange={(_, value) => void setFieldValue('pistonId', value)}
								onBlur={() => setFieldTouched('pistonId', true)}
								renderInput={params => (
									<TextField
										name="pistonId"
										label="Piston"
										fullWidth
										{...params}
										inputProps={{ ...params.inputProps }}
										error={!!errors.pistonId && touched.pistonId}
										helperText={errors.pistonId}
									/>
								)}
							/>
					}
				</Grid>
				{/* name */}
				<Grid item md={6} xs={12}>
					<Field
						type="text"
						name="name"
						label="Name"
						component={FormikTextField}
						fullWidth
						InputProps={{ disabled: true }}
					/>
				</Grid>
				{/* holesCount */}
				<Grid item md={6} xs={12}>
					<Field
						type="number"
						name="holesCount"
						label="Holes Count"
						fullWidth
						component={FormikTextField}
					/>
				</Grid>
				{/* thicknessByMM */}
				<Grid item md={6} xs={12}>
					<Field
						type="number"
						name="thicknessByMM"
						label="Thickness (MM)"
						fullWidth
						component={FormikTextField}
					/>
				</Grid>
				{/* meterWeight */}
				<Grid item md={6} xs={12}>
					<Field
						type="number"
						name="meterWeight"
						label="Meter Weight"
						fullWidth
						component={FormikTextField}
					/>
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

function ModelForm({ match: { params } }) {
	return (
		<Formik
			initialValues={initialModelValues}
			validationSchema={modelValidation}
			onSubmit={handleSubmit(params.id)}
			children={props => <TheModelForm {...props} modelId={params.id} />}
			enableReinitialize={true}
		/>
	)
}

export default ModelForm
