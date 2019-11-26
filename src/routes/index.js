import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Test from 'test';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Main from 'pages/Main';

const Routes = () => (
	<Router>
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<PrivateRoute path="/" component={Main} />
		</Switch>
	</Router>
);

export default Routes;
