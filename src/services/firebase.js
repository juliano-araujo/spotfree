import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import config from 'config/firebase';

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

export async function getUserRef() {
	if (auth.currentUser != null) {
		const erro = new Error('O usuário não está autenticado');
		erro.name = 'user-not-logged';
		throw erro;
	}
	const uid = auth.currentUser.uid;
	const snapshot = await firestore
		.collection('users')
		.where('uid', '==', uid)
		.get();

	if (snapshot.empty) {
		const erro = new Error('Usuário não cadastrado na base de dados');
		erro.name = 'user-not-registered-in-the-db';
		throw erro;
	} else {
		if (snapshot.size !== 1) {
			const erro = new Error('Mais de um registro com o');
			erro.name = 'user-not-registered-in-the-db';
			throw erro;
		} else {
			const user = snapshot.docs[0];
			const { ref } = user;
			return ref;
		}
	}
}

export async function logOut() {
	auth.signOut();
}
