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

import styled from 'styled-components'
const ListItemIcon = styled(Avatar)`
  width: 60px !important;
  height: 60px !important;
	margin-right: 1rem;
`

const deletePiston = id => e => {
	if(window.confirm('Are you sure you want to delete this piston ?')) {
		request({
			request: ['delete', `/pistons/${id}`],
			baseAction: 'pistons/deletePiston',
		})
	}
}

function PistonItem({ id, name, sticksCapacity, diameterByMM, avgWeightForCM, notes }) {

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
								<span><strong>Diameter (MM): </strong>{diameterByMM}</span>
								<span><strong>Average Weight For CM: </strong>{avgWeightForCM}</span>
								<span><strong>Sticks Capacity: </strong>{sticksCapacity}</span>
							</div>
						</>
					}
				/>
				<ListItemSecondaryAction>
					<IconButton color='primary' edge="end" aria-label="edit" onClick={e => history.push(`/piston-form/${id}`)}>
						<EditIcon />
					</IconButton>
					<IconButton color='secondary' edge="end" aria-label="delete" onClick={deletePiston(id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider />
		</React.Fragment>
	)
}

function PistonsList() {
	const { getPistonsUI, pistons } = useSelector((state) => ({
		getPistonsUI: state.pistons.getPistonsUI,
		pistons: Object.values(state.pistons.list),
	}))

	React.useEffect(() => {
		request({
			request: ['get', '/pistons'],
			baseAction: 'pistons/getPistons',
		})
	}, [])

	if (getPistonsUI.loading)
		return (
			<div className="w-100 h-100-vh flex-center">
				<CircularProgress disableShrink />
			</div>
		)

	return (
		<>
			<Paper className="flex-between p-1">
				<Chip
					color="default"
					variant="outlined"
					avatar={<Avatar>{pistons?.length}</Avatar>}
					label="All"
				/>
				<Link component={RouterLink} to="/piston-form">
					Add New Piston
				</Link>
			</Paper>
			<List component="div" aria-label="pistons list">
				{pistons.map(piston => <PistonItem key={piston.id} {...piston} /> )}
			</List>
		</>
	)
}

export default PistonsList
