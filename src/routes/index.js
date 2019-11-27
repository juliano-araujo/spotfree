import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Main from 'pages/Main';
import useAuthState from 'hooks/useAuthState';

export default function Routes() {
	const isAuthenticated = useAuthState();
	return (
		<Router>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<PrivateRoute
					path="/"
					component={Main}
					isAuthenticated={isAuthenticated}
				/>
			</Switch>
		</Router>
	);
}
