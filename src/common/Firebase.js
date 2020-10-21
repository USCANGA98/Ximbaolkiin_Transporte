import firebase from 'firebase/app';
import "firebase/firestore";


// Credenciales
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH8kAYuTLIxW6G4ieSXxHKGTmU8WCx60o",
  authDomain: "xiinbalkiin-a19ee.firebaseapp.com",
  databaseURL: "https://xiinbalkiin-a19ee.firebaseio.com",
  projectId: "xiinbalkiin-a19ee",
  storageBucket: "xiinbalkiin-a19ee.appspot.com",
  messagingSenderId: "44096971204",
  appId: "1:44096971204:web:280e84752fbc86503a8491"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Instancia que nos permite manejar la base de datos
// de firestore
const db = firebase.firestore();


export { db };
