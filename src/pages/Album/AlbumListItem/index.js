import React from 'react';

import { Container } from './styles';

export default function AlbumListItem({
	musicName,
	musicArtist,
	musicDuration,
}) {
	// Escrever PropTypes

	return (
		<Container className="my-2">
			<div className="row p-2">
				<div className="col-1 my-auto">
					<i className="fas fa-music float-right"></i>
				</div>
				<div className="col-9 p-0">
					<div className="row ">
						<div className="col-12">
							<p className="p-0 m-0">{musicName}</p>
						</div>
						<div className="col-12">
							<p className="blockquote-footer p-0 m-0">{musicArtist}</p>
						</div>
					</div>
				</div>
				<div className="col-1 pl-0 my-auto">
					<p className="p-0 m-0">{musicDuration}</p>
				</div>
			</div>
		</Container>
	);
}
