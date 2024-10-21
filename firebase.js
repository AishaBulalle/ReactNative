// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAbHCCu9JDH3oKfK7kDiYBKjo9S6xlPCzQ',
  authDomain: 'myproject-1993b.firebaseapp.com',
  projectId: 'myproject-1993b',
  storageBucket: 'myproject-1993b.appspot.com',
  messagingSenderId: '439921843205',
  appId: '1:439921843205:web:5025836bb6a1c3399d106c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);
export { app, database, storage };
