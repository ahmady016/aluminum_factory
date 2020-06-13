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

const deleteCage = id => e => {
	if(window.confirm('Are you sure you want to delete this Cage ?')) {
		request({
			request: ['delete', `/cages/${id}`],
			baseAction: 'cages/deleteCage',
		})
	}
}

function CageItem({ id, name, type, notes }) {
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
							<div className="my-05"><strong>Type: </strong>{type}</div>
							<div className="my-05"><strong>Notes: </strong>{notes}</div>
						</>
					}
				/>
				<ListItemSecondaryAction>
					<IconButton color='primary' edge="end" aria-label="edit" onClick={e => history.push(`/cage-form/${id}`)}>
						<EditIcon />
					</IconButton>
					<IconButton color='secondary' edge="end" aria-label="delete" onClick={deleteCage(id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider />
		</React.Fragment>
	)
}

function CagesList() {
	const { getCagesUI, cages } = useSelector((state) => ({
		getCagesUI: state.cages.getCagesUI,
		cages: Object.values(state.cages.list),
	}))

	React.useEffect(() => {
		request({
			request: ['get', '/cages'],
			baseAction: 'cages/getCages',
		})
	}, [])

	if (getCagesUI.loading)
		return (
			<div className="w-100 h-100-vh flex-center">
				<CircularProgress disableShrink />
			</div>
		)

	else if (getCagesUI.error)
		return (
				<Alert severity="error">{getCagesUI.error.message || 'Something went wrong!'}</Alert>
		)

	return (
		<>
			<Paper className="flex-between p-1">
				<Chip
					color="default"
					variant="outlined"
					avatar={<Avatar>{cages?.length}</Avatar>}
					label="All"
				/>
				<Link component={RouterLink} to="/cage-form">
					Add New Cage
				</Link>
			</Paper>
			<List component="div" aria-label="cages list">
				{cages.map(cage => <CageItem key={cage.id} {...cage} /> )}
			</List>
		</>
	)
}

export default CagesList
