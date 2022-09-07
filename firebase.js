// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyChnPOqSKeE6IPVFVbViNDumoYkXv9HG_o',
  authDomain: 'twitter-clone-9faf8.firebaseapp.com',
  projectId: 'twitter-clone-9faf8',
  storageBucket: 'twitter-clone-9faf8.appspot.com',
  messagingSenderId: '873787918890',
  appId: '1:873787918890:web:18c764a0180a71cd765153',
};

// Initialize Firebase for Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
