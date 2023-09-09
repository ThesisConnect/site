// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyACvVhf-tfRu77YbTygQJbV1oHeTJIdeX4',
  authDomain: 'thesisconect.firebaseapp.com',
  projectId: 'thesisconect',
  storageBucket: 'thesisconect.appspot.com',
  messagingSenderId: '762428848038',
  appId: '1:762428848038:web:b2555a327b360084f6c167',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
