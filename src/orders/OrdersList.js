/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { format } from 'date-fns'

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
import MoreIcon from '@material-ui/icons/More'
import Divider from '@material-ui/core/Divider'

import Alert from '@material-ui/lab/Alert'

import styled from 'styled-components'
const ListItemIcon = styled(Avatar)`
  width: 60px !important;
  height: 60px !important;
	margin-right: 1rem;
`

const deleteOrder = id => e => {
	if(window.confirm('Are you sure you want to delete this Order ?')) {
		request({
			request: ['delete', `/orders/${id}`],
			baseAction: 'orders/deleteOrder',
		})
	}
}

function OrderItem({ customers, id, serialNumber, customerId, dueDate, status, isPublic, notes }) {
	return (
		<React.Fragment key={id}>
			<ListItem dense>
				<ListItemAvatar>
					<ListItemIcon><ImageIcon fontSize="large" /></ListItemIcon>
				</ListItemAvatar>
				<ListItemText
					id={id}
					primary={serialNumber}
					secondary={
						<>
							<div className="my-05">{customers[customerId] ? customers[customerId].name : null}</div>
              <div className="my-05">{notes}</div>
							<div className="flex-between">
              	<span><strong>Due Date: </strong>{format(new Date(dueDate), 'dd/MM/yyyy hh:mm:ss a')}</span>
								<span><strong>Status: </strong>{status}</span>
								<span><strong>{isPublic ? 'Public' : 'Private'}</strong></span>
							</div>
						</>
					}
				/>
				<ListItemSecondaryAction>
          <IconButton color='primary' edge="end" aria-label="edit" onClick={e => history.push(`/order-details/${id}`)}>
						<MoreIcon />
					</IconButton>
					<IconButton color='primary' edge="end" aria-label="edit" onClick={e => history.push(`/order-form/${id}`)}>
						<EditIcon />
					</IconButton>
					<IconButton color='secondary' edge="end" aria-label="delete" onClick={deleteOrder(id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider />
		</React.Fragment>
	)
}

function OrdersList() {
	const { getOrdersUI, orders, customers } = useSelector((state) => ({
		getOrdersUI: state.orders.getOrdersUI,
    orders: Object.values(state.orders.list),
    customers: state.customers.list,
	}))

	React.useEffect(() => {
		request({
			request: ['get', '/orders'],
			baseAction: 'orders/getOrders',
		})
  }, [])

	React.useEffect(() => {
    if(!Object.keys(customers).length)
      request({
        request: ['get', '/customers'],
        baseAction: 'customers/getCustomers',
      })
  }, [Object.keys(customers).length])

	if (getOrdersUI.loading)
		return (
			<div className="w-100 h-100-vh flex-center">
				<CircularProgress disableShrink />
			</div>
		)

	else if (getOrdersUI.error)
		return (
				<Alert severity="error">{getOrdersUI.error.message || 'Something went wrong!'}</Alert>
		)

	return (
		<>
			<Paper className="flex-between p-1">
				<Chip
					color="default"
					variant="outlined"
					avatar={<Avatar>{orders?.length}</Avatar>}
					label="All"
				/>
				<Link component={RouterLink} to="/order-form">
					Add New Order
				</Link>
			</Paper>
			<List component="div" aria-label="orders list">
				{orders.map(order => <OrderItem key={order.id} {...order} customers={customers} /> )}
			</List>
		</>
	)
}

export default OrdersList
