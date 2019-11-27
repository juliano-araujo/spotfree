import React from 'react';

import { Route, Redirect, useLocation } from 'react-router-dom';

export default function PrivateRoute({
	component: Component,
	isAuthenticated,
	...rest
}) {
	let location = useLocation();
	return (
		<Route {...rest}>
			{isAuthenticated ? (
				<Component />
			) : (
				<Redirect to={{ pathname: '/login', state: { from: location } }} />
			)}
		</Route>
	);
}
