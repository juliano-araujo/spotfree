import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Album from 'pages/Album'

const Routes = () => (
	<Switch>
		<Route path="/album/:id" component={Album}/>
	</Switch>
);
