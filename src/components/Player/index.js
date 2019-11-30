import React, {
	useRef,
	useState,
	useImperativeHandle,
	forwardRef,
	useCallback,
} from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { convertSecondsToTime } from 'utils';
import { Container, Icons, Icon } from './styles';
import useKeyPress from 'hooks/useKeyPress';

function Player(
	{
		musicName,
		musicArtist,
		albumId,
		audioUrl,
		imageUrl,
		onNextMusic,
		onBackMusic,
	},
	ref,
) {
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
	const [duration, setDuration] = useState(0);

	const audioRef = useRef();

	const play = useCallback(() => {
		if (audioUrl.trim() !== '') {
			audioRef.current.play();
			setIsPlaying(true);
		}
	}, [audioUrl]);

	const pause = useCallback(() => {
		audioRef.current.pause();
		setIsPlaying(false);
	}, []);

	useImperativeHandle(
		ref,
		() => ({
			play,
			pause,
		}),
		[play, pause],
	);

	function tooglePlayPause() {
		if (isPlaying) {
			pause();
		} else {
			play();
		}
	}

	useKeyPress(
		event => {
			tooglePlayPause();
			event.preventDefault();
		},
		[' ', 'k'],
	);

	function handleMouseOver() {
		setIsHovering(true);
	}

	function handleMouseOut() {
		setIsHovering(false);
	}

	function handleDurationChange() {
		setDuration(audioRef.current.currentTime);
	}

	function handleLoadMetadata() {
		setDuration(audioRef.current.duration);
	}

	function playOnCanPlay(audioRef) {
		audioRef.current.addEventListener(
			'canplay',
			event => {
				play();
			},
			{ once: true },
		);
	}

	function handleBackMusic() {
		if (time > 3) {
			audioRef.current.currentTime = 0;
		} else {
			onBackMusic();
			playOnCanPlay(audioRef);
		}
	}

	function handleNextMusic() {
		onNextMusic();
		playOnCanPlay(audioRef);
	}

	function handleTimeUpdate() {
		setTime(audioRef.current.currentTime);
	}

	return (
		<>
			<audio
				ref={audioRef}
				src={audioUrl}
				onDurationChange={handleDurationChange}
				onLoadedMetadata={handleLoadMetadata}
				onTimeUpdate={handleTimeUpdate}
				onEnded={handleNextMusic}
			/>
			<Container className="fixed-bottom px-3">
				<div className="row my-2">
					{/* Album Info */}
					<div className="col-3">
						<div className="row">
							{/* Album Image */}
							<div className="col-xs-7 col-sm-7 col-md-6 col-lg-4 col-xl-3 d-none d-sm-block">
								<Link to={`album/${albumId}`}>
									<img
										src={
											imageUrl
												? imageUrl
												: 'https://image.freepik.com/icones-gratis/preto-simples-nota-vector-musica_318-10095.jpg'
										}
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
									<Icon icon="step-backward" onClick={handleBackMusic} />
									<Icon
										icon={isPlaying ? 'pause' : 'play'}
										className="ml-2 mr-1"
										onClick={tooglePlayPause}
									/>
									<Icon icon="step-forward" onClick={handleNextMusic} />
								</Icons>
							</div>

							<div className="col-12">
								<div className="row justify-content-between">
									<div className="col-1 p-0">
										<p className="text-white float-right my-2">
											{convertSecondsToTime(time)}
										</p>
									</div>
									<div className="col-10 my-auto">
										<div
											className="progress"
											style={{ height: '0.5vh', backgroundColor: '#404040' }}
											onMouseOver={handleMouseOver}
											onMouseOut={handleMouseOut}>
											<div
												className="progress-bar"
												style={{
													width: `${(time / duration) * 100}%`,
													backgroundColor: isHovering ? '#1db954' : '#b3b3b3',
												}}
												role="progressbar"
											/>
										</div>
									</div>
									<div className="col-1 p-0">
										<p className="text-white float-left my-2">
											{convertSecondsToTime(duration)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}

export default forwardRef(Player);
