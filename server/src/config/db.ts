import * as firebase from 'firebase/app';
import { firebaseConfig } from '@/config';
import { getFirestore } from 'firebase/firestore';

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
