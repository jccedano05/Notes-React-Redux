import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCyWm99ixm7N6Ev3Nq6o7NbDP3NlExaEvM",
    authDomain: "notes-react-app-2a80c.firebaseapp.com",
    projectId: "notes-react-app-2a80c",
    storageBucket: "notes-react-app-2a80c.appspot.com",
    messagingSenderId: "834577878428",
    appId: "1:834577878428:web:93da5ca0ece2af46b6cc59"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//Create BD firestore

const db = firebase.firestore();


//Auth firebase google account
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}