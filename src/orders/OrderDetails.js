/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import request from '../_helpers/request'

import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

const deleteOrder = id => e => {
	if(window.confirm('Are you sure you want to delete this Order ?')) {
		request({
			request: ['delete', `/orders/${id}`],
			baseAction: 'orders/deleteOrder',
		})
	}
}

const deleteOrderDetail = (id, orderId) => e => {
	if(window.confirm('Are you sure you want to delete this Order Detail Item ?')) {
		request({
			request: ['delete', `/ordersDetails/${id}`],
			baseAction: 'orders/deleteOrderDetail',
		})
	}
}

function OrderDetail({ id, orderId, strip, length, color, hardness, avgMeterWeight, sticksCount, totalWeight, notes }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar><LabelImportantIcon /></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={strip}
        secondary={
          <>
            <div className="my-05">{notes}</div>
            <div className="w-100 flex-between">
              <div className="flex-b-30"><strong>Length: </strong>{length}</div>
              <div className="flex-b-30"><strong>Color: </strong>{color}</div>
              <div className="flex-b-30"><strong>Hardness: </strong>{hardness}</div>
              <div className="flex-b-30"><strong>Avg Meter Weight: </strong>{avgMeterWeight}</div>
              <div className="flex-b-30"><strong>Sticks Count: </strong>{sticksCount}</div>
              <div className="flex-b-30"><strong>Total Weight: </strong>{totalWeight}</div>
            </div>
          </>
        }
      />
      <ListItemSecondaryAction>
        <IconButton color="secondary" edge="end" aria-label="delete" onClick={deleteOrderDetail(id, orderId)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

function OrderDetails({ match: { params } }) {
  const { getOrderUI, getOrderDetailsUI, customers, selectedOrder } = useSelector( state => ({
    getOrderUI: state.orders.getOrderUI,
    getOrderDetailsUI: state.orders.getOrderDetailsUI,
    customers: state.customers.list,
    selectedOrder: state.orders.list[params.id],
  }))

  React.useEffect(() => {
		if (!selectedOrder) {
			request({
				request: ['get', `/orders/${params.id}`],
				baseAction: 'orders/getOrder',
      })
    }
    if(selectedOrder && !selectedOrder.orderDetails) {
      request({
        request: ['get', `/ordersDetails?orderId=${params.id}`],
        baseAction: 'orders/getOrderDetails',
      })
    }
  }, [selectedOrder])

  React.useEffect(() => {
    if(!Object.keys(customers).length)
      request({
        request: ['get', '/customers'],
        baseAction: 'customers/getCustomers',
      })
  }, [Object.keys(customers).length])

	if (getOrderUI.loading || getOrderDetailsUI.loading)
    return (
      <div className="w-100 h-100-vh flex-center">
        <CircularProgress disableShrink />
      </div>
    )

  else if (getOrderUI.error || getOrderDetailsUI.error)
		return (
				<Alert severity="error">{getOrderUI.error?.message || getOrderDetailsUI.error?.message || 'Something went wrong!'}</Alert>
		)

  else if(selectedOrder)
    return (
			<Card className="mt-1">
				<CardHeader
					avatar={<Avatar aria-label="order">{selectedOrder.serialNumber}</Avatar>}
					title={`${customers[selectedOrder.customerId]?.name} - ${selectedOrder.isPublic ? 'Public' : 'Private'}`}
					subheader={format(selectedOrder.dueDate, 'dd/MM/yyyy hh:mm:ss a')}
				/>
				<CardContent>
					<div className="mt-05"><strong>Status: </strong>{selectedOrder.status}</div>
					<div className="mt-05"><strong>Notes: </strong>{selectedOrder.notes}</div>
					<List className="w-100">
            {selectedOrder.orderDetails && Object.values(selectedOrder.orderDetails)
              .map(orderDetail => <OrderDetail {...orderDetail} />)
            }
					</List>
				</CardContent>
				<CardActions className="my-05 float-r">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={deleteOrder(selectedOrder.id)}
          >
            Delete
          </Button>
				</CardActions>
			</Card>
		)

  return null
}

export default OrderDetails
