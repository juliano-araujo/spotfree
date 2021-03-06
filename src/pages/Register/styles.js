import styled from 'styled-components';

import background from 'assets/images/background.jpg';

export const Container = styled.div`
	display: table;
	width: 100%;
	height: 100%;
	background: url(${background}) no-repeat bottom center scroll;
	background-position: bottom;
	background-position: 30% 45%;
	background-size: cover;
`;

export const Menu = styled.div`
	background-color: #000;
`;

export const LogoContainer = styled.a`
	margin: auto;
`;

export const Body = styled.div`
	width: 100%;
	height: 90vh;
`;

export const SignIn = styled.div`
	background-color: white;
	font-size: 120%;
	margin: auto;
`;
