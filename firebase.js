// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyClu--------qkQ82WmHHCtoc',
  authDomain: 'mypr-----14.firebaseapp.com',
  projectId: 'mypr-----14',
  storageBucket: 'mypr-----14.appspot.com',
  messagingSenderId: '97-----03082',
  appId: '1:9----03082:web:9b8e1-----515d29b3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export { database, app };
