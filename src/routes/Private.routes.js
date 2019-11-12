import React, { useEffect, useState } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { auth } from 'services/firebase';

export default function PrivateRoute({ component: Component, ...rest }) {
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		});

		return unsubscribe;
	}, []);

	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				)
			}
		/>
	);
}
