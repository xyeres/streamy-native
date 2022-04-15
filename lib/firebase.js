// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
import {getFunctions} from 'firebase/functions';
import Constants from 'expo-constants';

const firebaseConfig = Constants.manifest.extra.firebaseConfig;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const functions = getFunctions(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
