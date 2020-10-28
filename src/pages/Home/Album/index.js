import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Album({ name, artist, imageUrl, albumId }) {
	Album.propTypes = {
		name: PropTypes.string.isRequired,
		artist: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		albumId: PropTypes.string.isRequired,
	};

	return (
		<Link to={`/album/${albumId}`} className="col-4 col-sm-3 col-md-3 col-lg-2">
			<div className="card border-dark">
				<img src={imageUrl} className="card-img" alt="imagem não disponível" />
			</div>
			<p className="text-white text-center p-0 m-0">{name}</p>
			<p className="text-muted text-center p-0 m-0">{artist}</p>
		</Link>
	);
}
