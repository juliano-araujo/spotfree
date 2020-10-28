import React, { useState, useRef } from 'react';

import MobileHeader from 'components/MobileHeader';
import SideMenu from 'components/SideMenu';
import Player from 'components/Player';
import Routes from 'routes/Main.routes';
import { MainSection } from './styles';
import { firestore, storage } from 'services/firebase';

export default function Main() {
	const [playList, setPlayList] = useState([{}]);
	const [currentMusic, setCurrentMusic] = useState(-1);

	const playerRef = useRef();

	function nextMusic() {
		if (currentMusic < playList.length - 1) {
			setCurrentMusic(currentMusic + 1);
		} else if (currentMusic !== -1) {
			setCurrentMusic(0);
		}
	}

	function backMusic() {
		if (currentMusic !== -1) {
			setCurrentMusic(currentMusic - 1);
		}
	}

	async function setPlaylistToAlbum(albumId, musicId) {
		const albumRef = firestore.doc(`albuns/${albumId}`);
		const albumSnap = await albumRef.get();

		if (albumSnap.exists) {
			// Set the info of the album
			const {
				artist: albumArtist,
				name: albumName,
				year: albumYear,
			} = albumSnap.data();
			const albumId = albumSnap.id;

			// Download and set the album image
			const imagefile = albumSnap.get('imagefile');
			const imageRef = storage.ref(`albuns/${albumId}/${imagefile}`);
			const imageUrl = await imageRef.getDownloadURL();

			const musicsSnap = await albumRef
				.collection('musics')
				.orderBy('number')
				.get();

			let musicList = [];
			const promises = musicsSnap.docs.map(async documentSnap => {
				const musicData = documentSnap.data();
				const musicFilename = `albuns/${albumId}/musics/${musicData.filename}`;
				const musicRef = storage.ref(musicFilename);
				const audioUrl = await musicRef.getDownloadURL();

				Object.assign(musicData, {
					id: documentSnap.id,
					albumId,
					filename: musicFilename,
					albumImageUrl: imageUrl,
					albumYear,
					albumArtist,
					albumName,
					audioUrl,
				});

				musicList[musicData.number - 1] = musicData;
			});
			await Promise.all(promises);

			// Limpa os valores indefinidos em álbuns incompletos
			const cleanedMusicList = musicList.filter(item => item);
			setPlayList(cleanedMusicList);
			if (musicId) {
				const musicIndex = cleanedMusicList.findIndex(
					item => item.id === musicId,
				);
				setCurrentMusic(musicIndex);
				playerRef.current.play();
			} else {
				setCurrentMusic(-1);
			}
		}
	}

	return (
		<>
			<header>
				<MobileHeader />
			</header>
			<section className="container-fluid p-0">
				<div className="row no-gutters mx-0 min-vh-100 vh-100">
					<SideMenu />
					<MainSection className="col-xs-12 col-sm-12 col-md-9 col-lg-10">
						<Routes setPlaylistToAlbum={setPlaylistToAlbum} />
					</MainSection>
				</div>
			</section>
			<footer>
				<Player
					ref={playerRef}
					musicInfo={playList[currentMusic] ? playList[currentMusic] : {}}
					onNextMusic={nextMusic}
					onBackMusic={backMusic}
				/>
			</footer>
		</>
	);
}
