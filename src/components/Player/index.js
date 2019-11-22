import React, { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { convertSecondsToTime } from 'utils';
import { Container, Icons, AudioBar, ProgressBar, Icon } from './styles';

export default function Player({
	musicName,
	musicArtist,
	albumId,
	audioUrl,
	imageUrl,
	onNextMusic,
	onBackMusic,
}) {
	Player.propTypes = {
		musicName: PropTypes.string,
		musicArtist: PropTypes.string,
		albumId: PropTypes.string,
		audioUrl: PropTypes.string,
		imageUrl: PropTypes.string,
		onNextMusic: PropTypes.func.isRequired,
		onBackMusic: PropTypes.func.isRequired,
	};

	Player.defaultProps = {
		musicName: '',
		musicArtist: '',
		albumId: '',
		audioUrl: '',
		imageUrl: '',
	};

	const [isHovering, setIsHovering] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [time, setTime] = useState(0);

	const audioRef = useRef(null);

	function handleMouseOver() {
		setIsHovering(true);
	}

	function handleMouseOut() {
		setIsHovering(false);
	}

	function handleDurationChange() {
		setTime(audioRef.current.currentTime);
	}

	function handleLoadMetadata() {
		setTime(convertSecondsToTime(audioRef.current.duration));
	}

	function tooglePlayPause() {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			audioRef.current.play();
			setIsPlaying(true);
		}
	}

	function buttonIcon() {
		if (isPlaying) {
			return 'play';
		} else {
			return 'pause';
		}
	}

	return (
		<Container className="fixed-bottom">
			<div className="row my-2">
				{/* Album Info */}
				<div className="col-3">
					<div className="row">
						{/* Album Image */}
						<div className="col-xs-7 col-sm-7 col-md-6 col-lg-4 col-xl-3 d-none d-sm-block">
							<Link to={`album/${albumId}`}>
								<img
									src={imageUrl}
									className="card-img"
									alt="imagem não disponível"
								/>
							</Link>
						</div>

						{/* Album Image for Mobile */}
						<div className="col-xs-7 col-sm-7 col-md-6 col-lg-4 col-xl-3 d-xs-block d-sm-none">
							<Link to={`album/${albumId}`}>
								<img
									src={imageUrl}
									className="card-img my-2 mx-1"
									alt="imagem não disponível"
									style={{ width: '7vh' }}
								/>
							</Link>
						</div>
						{/* Artist */}
						<div className="col-md-6 col-lg-8 d-xs-block d-none d-md-block">
							<div>
								<p className="text-white mt-2 mb-0">{musicName}</p>
								<p className="blockquote-footer m-0">{musicArtist}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Controls */}
				<div className="col-6">
					<div className="row">
						<div className="col-12">
							<Icons className="w-100 mb-0">
								<Icon icon="step-backward" onClick={onBackMusic} />
								<Icon
									icon={buttonIcon}
									className="ml-2 mr-1"
									onClick={tooglePlayPause}
								/>
								<Icon icon="step-forward" onClick={onNextMusic} />
							</Icons>
						</div>

						<div className="col-12">
							<div className="row justify-content-between">
								<div className="col-1 p-0">
									<p className="text-white float-right my-2">
										{convertSecondsToTime(audioRef.current.duration)}
									</p>
								</div>
								<div className="col-10 my-auto">
									<AudioBar
										className="progress"
										onMouseOver={handleMouseOver}
										onMouseOut={handleMouseOut}>
										<ProgressBar
											hover={isHovering}
											className="progress-bar"
											role="progressbar"
											style={{ width: '25%' }}
										/>
									</AudioBar>
								</div>
								<div className="col-1 p-0">
									<p className="text-white float-left my-2">
										{convertSecondsToTime(time)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<audio
				ref={audioRef}
				src={audioUrl}
				onDurationChange={handleDurationChange}
				onLoadedMetadata={handleLoadMetadata}
			/>
		</Container>
	);
}
