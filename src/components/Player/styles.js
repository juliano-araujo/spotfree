import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled.div`
	background-color: #282828;
	border-top: solid 1.3px black;
`;

export const Icons = styled.div`
	text-align: center;
	color: #b3b3b3;
	font-size: 1.4rem;
	margin-bottom: 2%;
`;

export const Icon = styled(FontAwesomeIcon)`
	:hover {
		opacity: 0.5;
	}
`;
