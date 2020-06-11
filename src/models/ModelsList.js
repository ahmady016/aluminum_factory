import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useSelector } from 'react-redux'
import request from '../_helpers/request'

import { history } from '../index'

import CircularProgress from '@material-ui/core/CircularProgress'

import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Link from '@material-ui/core/Link'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ImageIcon from '@material-ui/icons/Image'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'

import Alert from '@material-ui/lab/Alert'

import styled from 'styled-components'
const ListItemIcon = styled(Avatar)`
  width: 60px !important;
  height: 60px !important;
	margin-right: 1rem;
`

const deleteModel = id => e => {
	if(window.confirm('Are you sure you want to delete this Model ?')) {
		request({
			request: ['delete', `/models/${id}`],
			baseAction: 'models/deleteModel',
		})
	}
}

function ModelItem({ id, name, strip, type, pistonId, holesCount, thicknessByMM, meterWeight, notes }) {
	return (
		<React.Fragment key={id}>
			<ListItem dense>
				<ListItemAvatar>
					<ListItemIcon><ImageIcon fontSize="large" /></ListItemIcon>
				</ListItemAvatar>
				<ListItemText
					id={id}
					primary={name}
					secondary={
						<>
							<div className="my-05">{notes}</div>
							<div className="flex-between">
                <span><strong>Strip: </strong>{strip}</span>
								<span><strong>Type: </strong>{type}</span>
								<span><strong>Piston: </strong>{pistonId}</span>
								<span><strong>Thickness (MM): </strong>{thicknessByMM}</span>
								<span><strong>Meter Weight: </strong>{meterWeight}</span>
								<span><strong>Holes Count: </strong>{holesCount}</span>
							</div>
						</>
					}
				/>
				<ListItemSecondaryAction>
					<IconButton color='primary' edge="end" aria-label="edit" onClick={e => history.push(`/model-form/${id}`)}>
						<EditIcon />
					</IconButton>
					<IconButton color='secondary' edge="end" aria-label="delete" onClick={deleteModel(id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider />
		</React.Fragment>
	)
}

function ModelsList() {
	const { getModelsUI, models } = useSelector((state) => ({
		getModelsUI: state.models.getModelsUI,
		models: Object.values(state.models.list),
	}))

	React.useEffect(() => {
		request({
			request: ['get', '/models'],
			baseAction: 'models/getModels',
		})
	}, [])

	if (getModelsUI.loading)
		return (
			<div className="w-100 h-100-vh flex-center">
				<CircularProgress disableShrink />
			</div>
		)

	else if (getModelsUI.error)
		return (
				<Alert severity="error">{getModelsUI.error.message || 'Something went wrong!'}</Alert>
		)

	return (
		<>
			<Paper className="flex-between p-1">
				<Chip
					color="default"
					variant="outlined"
					avatar={<Avatar>{models?.length}</Avatar>}
					label="All"
				/>
				<Link component={RouterLink} to="/model-form">
					Add New Model
				</Link>
			</Paper>
			<List component="div" aria-label="pistons list">
				{models.map(model => <ModelItem key={model.id} {...model} /> )}
			</List>
		</>
	)
}

export default ModelsList
