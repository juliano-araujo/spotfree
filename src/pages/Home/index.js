import React, { useState, useEffect } from 'react';

import Album from './Album';
import { firestore, storage } from 'services/firebase';

export default function Home() {
	const [albuns, setAlbuns] = useState([{}]);

	async function fetchAlbunsInfo() {
		try {
			const albunsRef = firestore.collection('albuns');
			const albunsSnap = await albunsRef.get();
			let albunsList = [];

			const promises = albunsSnap.docs.map(async album => {
				const { id } = album;
				const { name, artist } = album.data();

				const imagefile = album.get('imagefile');
				const imageRef = storage.ref(`albuns/${id}/${imagefile}`);
				const imageUrl = await imageRef.getDownloadURL();
				albunsList.push({
					id,
					name,
					artist,
					imageUrl,
				});
			});
			await Promise.all(promises);
			setAlbuns(albunsList);
		} catch (err) {
			console.error(err.name, err.message);
			console.tron.log(err.name, err.message);
		}
	}

	useEffect(() => {
		fetchAlbunsInfo();
	}, []);

	return (
		<section>
			<div className="container-fluid font-weight-bold">
				<h1 className="display-5 text-white mt-5 mb-4">Nossos Álbums</h1>
				<div className="row">
					{albuns.map(item => (
						<Album
							key={item.id}
							name={item.name}
							artist={item.artist}
							imageUrl={item.imageUrl}
							albumId={item.id}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
