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
	const [time, setTime] = useState('00:00');

	const audioRef = useRef(null);

	function handleMouseOver() {
		setIsHovering(true);
	}

	function handleMouseOut() {
		setIsHovering(false);
	}

	function handleDurationChange() {
		const converted = convertSecondsToTime(audioRef.current.currentTime);
		setTime(converted);
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

	function nextMusic() {}

	function backMusic() {}

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
				{/* Informações do Album */}
				<div className="col-3">
					<div className="row">
						{/* Imagem Album */}
						<div className="col-xs-7 col-sm-7 col-md-6 col-lg-4 col-xl-3 d-none d-sm-block">
							<Link to={`album/${albumId}`}>
								<img
									src={imageUrl}
									className="card-img"
									alt="imagem não disponível"
								/>
							</Link>
						</div>

						{/* Imagem Album para Mobile */}
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
						{/* Artista */}
						<div className="col-md-6 col-lg-8 d-xs-block d-none d-md-block">
							<div>
								<p className="text-white mt-2 mb-0">{musicName}</p>
								<p className="blockquote-footer m-0">{musicArtist}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Controles */}
				<div className="col-6">
					<div className="row">
						<div className="col-12">
							<Icons className="w-100 mb-0">
								{/* TODO icons */}
								<Icon icon="step-backward" />
								<Icon
									icon={buttonIcon}
									className="ml-2 mr-1"
									onClick={tooglePlayPause}
								/>
								<Icon icon="step-forward" />
							</Icons>
						</div>

						<div className="col-12">
							<div className="row justify-content-between">
								<div className="col-1 p-0">
									<p className="text-white float-right my-2">{time}</p>
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
										{convertSecondsToTime(audioRef.current.duration)}
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
			/>
		</Container>
	);
}
