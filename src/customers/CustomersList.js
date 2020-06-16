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

const deleteCustomer = id => e => {
	if(window.confirm('Are you sure you want to delete this Customer ?')) {
		request({
			request: ['delete', `/customers/${id}`],
			baseAction: 'customers/deleteCustomer',
		})
	}
}

function CustomerItem({ id, name, email, address, mobile, notes }) {
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
							<div className="my-05"><strong>Address: </strong>{address}</div>
							<div className="flex-between">
								<span><strong>Email: </strong>{email}</span>
								<span><strong>Mobile: </strong>{mobile}</span>
							</div>
						</>
					}
				/>
				<ListItemSecondaryAction>
					<IconButton color='primary' edge="end" aria-label="edit" onClick={e => history.push(`/customer-form/${id}`)}>
						<EditIcon />
					</IconButton>
					<IconButton color='secondary' edge="end" aria-label="delete" onClick={deleteCustomer(id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider />
		</React.Fragment>
	)
}

function CustomersList() {
	const { getCustomersUI, customers } = useSelector((state) => ({
		getCustomersUI: state.customers.getCustomersUI,
		customers: Object.values(state.customers.list),
	}))

	React.useEffect(() => {
		request({
			request: ['get', '/customers'],
			baseAction: 'customers/getCustomers',
		})
	}, [])

	if (getCustomersUI.loading)
		return (
			<div className="w-100 h-100-vh flex-center">
				<CircularProgress disableShrink />
			</div>
		)

	else if (getCustomersUI.error)
		return (
				<Alert severity="error">{getCustomersUI.error.message || 'Something went wrong!'}</Alert>
		)

	return (
		<>
			<Paper className="flex-between p-1">
				<Chip
					color="default"
					variant="outlined"
					avatar={<Avatar>{customers?.length}</Avatar>}
					label="All"
				/>
				<Link component={RouterLink} to="/customer-form">
					Add New Customer
				</Link>
			</Paper>
			<List component="div" aria-label="customers list">
				{customers.map(customer => <CustomerItem key={customer.id} {...customer} /> )}
			</List>
		</>
	)
}

export default CustomersList
