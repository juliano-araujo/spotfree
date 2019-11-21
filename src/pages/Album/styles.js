import styled from 'styled-components';

export const AlbumImage = styled.img`
	margin: auto;
	width: 40vh;

	:hover {
		opacity: 0.5;
	}
`;

export const Button = styled.button`
	height: 45%;
	opacity: 0.9;
	background-color: #1db954;
	border: solid 3px #1db954;
	border-radius: 21px;

	:hover {
		opacity: 2;
		transform: scale(1.03);
	}
`;

export const MusicList = styled.ul`
	list-style: none;
	color: white;
`;
