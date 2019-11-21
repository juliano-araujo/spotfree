import { useState, useEffect } from 'react';

import { auth } from 'services/firebase';

export function useAuthState() {
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

	return isAuthenticated;
}
