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
					<Route path="/cages" component={props => <h3>Cages</h3>} />
					<Route path="/customers" component={props => <h3>Customers</h3>} />
					<Route path="/orders" component={props => <h3>Orders</h3>} />
					<Redirect to="/dashboard" />
				</Switch>
			</Container>
		</>
	)
}

export default withRouter(App)
