//import firebase from 'firebase/app'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXDLFHFUJj6v-Tx7pxhj18Pk97m3vwRqk",
    authDomain: "socia-lite-f305b.firebaseapp.com",
    projectId: "socia-lite-f305b",
    storageBucket: "socia-lite-f305b.appspot.com",
    messagingSenderId: "1070934525873",
    appId: "1:1070934525873:web:e06f94981059ea85e89f90",
    measurementId: "G-LQ4X41B6TR"
  };

  
  // Initialize Firebase
   const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  
  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider()


  export { db, auth, provider };

   // export default firebase;
