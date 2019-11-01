import * as firebase from 'firebase';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import config from 'config/firebase'

firebase.initializeApp(config)

export const firestore = firebase.firestore();
export const strorage = firebase.storage();
export const auth = firebase.auth();
