import React, { useState } from 'react';

import { firestore, storage } from 'services/firebase';

export default function Main() {
	const [playList, setPlayList] = useState([{}]);
	const [currentMusic, setCurrentMusic] = useState(-1);

	function nextMusic() {
		if (currentMusic < playList.length - 1) {
			setCurrentMusic(currentMusic + 1);
		} else {
			setCurrentMusic(0);
		}
	}

	function backMusic() {
		if (currentMusic !== -1) {
			setCurrentMusic(currentMusic - 1);
		}
	}

	function cleanPlayList() {
		setPlayList([{}]);
	}

	async function setPlaylistToAlbum(albumId, musicId) {
		const albumRef = firestore.doc(`albuns/${albumId}`);
		const albumSnap = await albumRef.get();

		if (albumSnap.exists) {
			// Set the info of the album
			const { artist, name, year } = albumSnap.data();

			// Download and set the album image
			const imagefile = albumSnap.get('imagefile');
			const imageRef = storage.ref(`albuns/${albumId}/${imagefile}`);
			const imageUrl = await imageRef.getDownloadURL();

			const musicsSnap = await albumRef
				.collection('musics')
				.orderBy('number')
				.get();

			let musicList = [];
			musicsSnap.forEach(documentSnap => {
				const musicData = documentSnap.data();
				const musicFilename = `albuns/${albumId}/musics/${musicData.filename}`;
				Object.assign(musicData, {
					id: documentSnap.id,
					filename: musicFilename,
					albumImageUrl: imageUrl,
					year,
					albumArtist: artist,
					albumName: name,
				});

				musicList.push(musicData);
			});
			setPlayList(musicList);
			if (musicId) {
				const musicIndex = musicList.findIndex(
					item => item.id === musicId,
				);
				setCurrentMusic(musicIndex);
			} else {
				setCurrentMusic(-1);
			}
		}
	}

	return <div />;
}
