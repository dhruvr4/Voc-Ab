import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD6Xi2XISAlkaY_24kSXxhNikzNirylw_4",
    authDomain: "voc-ab.firebaseapp.com",
    databaseURL: "https://voc-ab.firebaseio.com",
    projectId: "voc-ab",
    storageBucket: "voc-ab.appspot.com",
    messagingSenderId: "48251159172",
    appId: "1:48251159172:web:201f544d60bcd8c3c878d1",
    measurementId: "G-CWE55Q64X9"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase};