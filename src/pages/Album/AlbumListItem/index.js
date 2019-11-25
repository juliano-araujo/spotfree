import React from 'react';

import PropTypes from 'prop-types';
import Icon from '@fortawesome/react-fontawesome';

import { Container } from './styles';

export default function AlbumListItem({
	musicName,
	musicArtist,
	musicDuration,
	playingState,
}) {
	AlbumListItem.propTypes = {
		musicName: PropTypes.string.isRequired,
		musicArtist: PropTypes.string.isRequired,
		musicDuration: PropTypes.string.isRequired,
		playingState: PropTypes.oneOf(['playing', 'paused']),
	};

	AlbumListItem.defaultProps = {
		playingState: undefined,
	};

	function musicIcon(playingState) {
		if (playingState) {
			if (playingState === 'playing') {
				return 'play';
			} else {
				return 'pause';
			}
		} else {
			return 'music';
		}
	}

	return (
		<Container className="my-2">
			<div className="row p-2">
				<div className="col-1 my-auto">
					<Icon
						icon={musicIcon(playingState)}
						className="float-right"
					/>
				</div>
				<div className="col-9 p-0">
					<div className="row ">
						<div className="col-12">
							<p className="p-0 m-0">{musicName}</p>
						</div>
						<div className="col-12">
							<p className="blockquote-footer p-0 m-0">
								{musicArtist}
							</p>
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
