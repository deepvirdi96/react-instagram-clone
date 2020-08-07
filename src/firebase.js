import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDouqpEx-OgwQpbzSAxI9kIq7j_FOZNVRQ",
    authDomain: "instagram-clone-react-6a5d7.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-6a5d7.firebaseio.com",
    projectId: "instagram-clone-react-6a5d7",
    storageBucket: "instagram-clone-react-6a5d7.appspot.com",
    messagingSenderId: "10822190837",
    appId: "1:10822190837:web:9745ccba2ad84ec02667bc",
    measurementId: "G-Y75CHY2KFY"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };