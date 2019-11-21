import React, { useEffect, useState } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { useAuthState } from 'hooks/useAuthState';

export default function PrivateRoute({ component: Component, ...rest }) {
	const isAuthenticated = useAuthState();

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
