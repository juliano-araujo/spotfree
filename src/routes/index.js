import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './Private.routes';
import Test from 'test';
import Login from 'pages/Login';

const Routes = () => (
	<Router>
		<Switch>
			<Route path="/login" component={Login} />
			<PrivateRoute path="/" component={Test} />
		</Switch>
	</Router>
);

export default Routes;
