import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body, html{
		width: 100%;
    height: 100%;
		user-select: none;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
	}
`;

export default GlobalStyle;
