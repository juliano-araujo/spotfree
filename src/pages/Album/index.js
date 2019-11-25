import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { firestore, storage } from 'services/firebase';
import ListItem from './AlbumListItem';
import { AlbumImage, Button, MusicList } from './styles';

export default function Album({ playingMusicId }) {
	Album.propTypes = {
		playingMusicId: PropTypes.string.isRequired,
	};

	const [albumImagemUrl, setAlbumImageUrl] = useState('');
	const [albumArtist, setAlbumArtist] = useState('');
	const [albumName, setAlbumName] = useState('');
	const [albumYear, setAlbumYear] = useState('');
	const [albumMusics, setAlbumMusics] = useState([{}]);

	let { albumId } = useParams();

	async function fetchAlbumInfo(albumId) {
		try {
			const albumRef = firestore.doc(`albuns/${albumId}`);
			const albumSnap = await albumRef.get();

			if (albumSnap.exists) {
				// Set the info of the album
				const { artist, name, year } = albumSnap.data();
				setAlbumArtist(artist);
				setAlbumName(name);
				setAlbumYear(year);

				// Download and set the album image
				const imagefile = albumSnap.get('imagefile');
				const imageRef = storage.ref(`albuns/${albumId}/${imagefile}`);
				const imageUrl = await imageRef.getDownloadURL();
				setAlbumImageUrl(imageUrl);

				// Search the album musics
				const musicsSnap = await albumRef
					.collection('musics')
					.orderBy('number')
					.get();

				let musicList = [];
				if (!musicsSnap.empty) {
					musicsSnap.forEach(documentSnap => {
						const musicData = documentSnap.data();
						const musicFilename = `albuns/${albumId}/musics/${musicData.filename}`;
						Object.assign(musicData, {
							id: documentSnap.id,
							filename: musicFilename,
						});

						musicList.push(musicData);
					});

					setAlbumMusics(musicList);
				}
			}
		} catch (err) {
			console.error(err.name, err.message);
		}
	}

	useEffect(() => {
		fetchAlbumInfo(albumId);
	}, [albumId]);

	return (
		<div className="row m-0 pt-4">
			{/* Coluna do Album e Informações */}
			<div className="col-xs-8 col-sm-12 col-md-12 col-lg-4">
				<div className="row justify-content-center">
					{/* Imagem e Informações Do album */}
					<div className="col-12">
						<AlbumImage
							className="d-block mx-auto"
							src={albumImagemUrl}
							alt="Imagem não Disponível"
						/>
						<p className="h2 text-center text-white font-weight-bold mb-2">
							{albumName}
						</p>
						<p className="text-center text-muted p-0">
							{albumArtist}
						</p>
					</div>
					{/* Botão e Informações */}
					<div className="col-5 col-xs-3 col-sm-4 col-md-4 col-lg-6 mt-3">
						<Button className="btn-block text-white py-1">
							Play
						</Button>
						<p className="text-center text-white-50 my-3">
							{albumYear} &bull; {albumMusics.length} Músicas
						</p>
					</div>
				</div>
			</div>

			{/* Lista de Musicas do Album  */}
			<div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
				<div className="container">
					<MusicList className="pb-3 p-0">
						{albumMusics.map(item => (
							<ListItem
								key={item.id}
								musicName={item.name}
								musicDuration={item.duration}
								musicArtist={item.artist}
							/>
						))}
					</MusicList>
				</div>
			</div>
		</div>
	);
}
