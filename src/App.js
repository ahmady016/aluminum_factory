import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import Container from '@material-ui/core/Container'

import Header from './Header'
import Dashboard from './Dashboard'

import PistonsList from './pistons/PistonsList'
import PistonForm from './pistons/PistonForm'

import ModelsList from './models/ModelsList'
import ModelForm from './models/ModelForm'

import OvensList from './ovens/OvensList'
import OvenForm from './ovens/OvenForm'

import CagesList from './cages/CagesList'
import CageForm from './cages/CageForm'

import CustomersList from './customers/CustomersList'
import CustomerForm from './customers/CustomerForm'

import OrdersList from './orders/OrdersList'
import OrderDetails from './orders/OrderDetails'
import OrderForm from './orders/OrderForm'

function App() {
	return (
		<>
			<Header title="Aluminum Factory App" />
			<Container>
				<Switch>
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/pistons" component={PistonsList} />
					<Route path="/piston-form/:id" component={PistonForm} />
					<Route path="/piston-form" component={PistonForm} />
					<Route path="/models" component={ModelsList} />
					<Route path="/model-form/:id" component={ModelForm} />
					<Route path="/model-form" component={ModelForm} />
					<Route path="/ovens" component={OvensList} />
					<Route path="/oven-form/:id" component={OvenForm} />
					<Route path="/oven-form" component={OvenForm} />
					<Route path="/cages" component={CagesList} />
					<Route path="/cage-form/:id" component={CageForm} />
					<Route path="/cage-form" component={CageForm} />
					<Route path="/customers" component={CustomersList} />
					<Route path="/customer-form/:id" component={CustomerForm} />
					<Route path="/customer-form" component={CustomerForm} />
					<Route path="/orders" component={OrdersList} />
					<Route path="/order-details/:id" component={OrderDetails} />
					<Route path="/order-form/:id" component={OrderForm} />
					<Route path="/order-form" component={OrderForm} />
					<Redirect to="/dashboard" />
				</Switch>
			</Container>
		</>
	)
}

export default withRouter(App)
