import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAGic7Cfeofc_TsQwfGRYMrg_XQ8QdXefE',
  authDomain: 'frito-d7e65.firebaseapp.com',
  projectId: 'frito-d7e65',
  storageBucket: 'frito-d7e65.firebasestorage.app',
  messagingSenderId: '825705073017',
  appId: '1:825705073017:web:e07d9747fccd535974c7a8',
  measurementId: 'G-GG0X9SJBYF',
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseDb = getFirestore(firebaseApp, 'frito');
