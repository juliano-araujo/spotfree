import React from 'react';

import { useHistory } from 'react-router-dom';

import { logOut, isAuthenticated } from 'services/firebase';

export default function Teste() {
	const history = useHistory();
	console.log(isAuthenticated());

	return (
		<>
			<h1>Teste</h1>
			<button
				onClick={() => {
					logOut();
					history.push('/login');
				}}>
				Sair
			</button>
		</>
	);
}
