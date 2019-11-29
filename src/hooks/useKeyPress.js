import { useEffect } from 'react';

export default function useKeyPress(func, triggerKeys) {
	useEffect(() => {
		function keyPress(event) {
			const { key } = event;
			const result = triggerKeys.findIndex(item => key === item);
			if (result !== -1) {
				func(event);
			}
		}
		window.addEventListener('keypress', keyPress);

		return () => {
			window.removeEventListener('keypress', keyPress);
		};
	}, [func, triggerKeys]);
}
