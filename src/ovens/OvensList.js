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

const deleteOven = id => e => {
	if(window.confirm('Are you sure you want to delete this Oven ?')) {
		request({
			request: ['delete', `/ovens/${id}`],
			baseAction: 'ovens/deleteOven',
		})
	}
}

function OvenItem({ id, name, cagesCapacity, notes }) {
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
							<div className="my-05"><strong>Cages Capacity: </strong>{cagesCapacity}</div>
							<div className="my-05"><strong>Notes: </strong>{notes}</div>
						</>
					}
				/>
				<ListItemSecondaryAction>
					<IconButton color='primary' edge="end" aria-label="edit" onClick={e => history.push(`/oven-form/${id}`)}>
						<EditIcon />
					</IconButton>
					<IconButton color='secondary' edge="end" aria-label="delete" onClick={deleteOven(id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider />
		</React.Fragment>
	)
}

function OvensList() {
	const { getOvensUI, ovens } = useSelector((state) => ({
		getOvensUI: state.models.getModelsUI,
		ovens: Object.values(state.ovens.list),
	}))

	React.useEffect(() => {
		request({
			request: ['get', '/ovens'],
			baseAction: 'ovens/getOvens',
		})
	}, [])

	if (getOvensUI.loading)
		return (
			<div className="w-100 h-100-vh flex-center">
				<CircularProgress disableShrink />
			</div>
		)

	else if (getOvensUI.error)
		return (
				<Alert severity="error">{getOvensUI.error.message || 'Something went wrong!'}</Alert>
		)

	return (
		<>
			<Paper className="flex-between p-1">
				<Chip
					color="default"
					variant="outlined"
					avatar={<Avatar>{ovens?.length}</Avatar>}
					label="All"
				/>
				<Link component={RouterLink} to="/oven-form">
					Add New Oven
				</Link>
			</Paper>
			<List component="div" aria-label="ovens list">
				{ovens.map(oven => <OvenItem key={oven.id} {...oven} /> )}
			</List>
		</>
	)
}

export default OvensList
