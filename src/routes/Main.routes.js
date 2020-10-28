import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Album from 'pages/Album';
import Home from 'pages/Home';

// TODO PropTypes
const Routes = ({ setPlaylistToAlbum }) => (
	<Switch>
		<Route path="/album/:id">
			<Album onAlbumPlayingMusicChange={setPlaylistToAlbum} />
		</Route>
		<Route>
			<Home path="/browse" />
		</Route>
	</Switch>
);

export default Routes;
