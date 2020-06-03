import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import Container from '@material-ui/core/Container'

import Header from './Header'
import Dashboard from './Dashboard'
import PistonsList from './pistons/PistonsList'
import PistonForm from './pistons/PistonForm'

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
					<Route path="/models" component={props => <h3>Models</h3>} />
					<Route path="/cages" component={props => <h3>Cages</h3>} />
					<Route path="/ovens" component={props => <h3>Ovens</h3>} />
					<Route path="/customers" component={props => <h3>Customers</h3>} />
					<Route path="/orders" component={props => <h3>Orders</h3>} />
					<Redirect to="/dashboard" />
				</Switch>
			</Container>
		</>
	)
}

export default withRouter(App)
