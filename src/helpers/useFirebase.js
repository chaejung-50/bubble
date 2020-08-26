import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyA50U_noQlIhBE6sDg_x3rMyC6zClRDACY",
    authDomain: "linger-271221.firebaseapp.com",
    databaseURL: "https://linger-271221.firebaseio.com",
    projectId: "linger-271221",
    storageBucket: "linger-271221.appspot.com",
    messagingSenderId: "985392384487",
    appId: "1:985392384487:web:8ea09082e4c30f7b1d9542",
    measurementId: "G-F5073V0M8M"
});


export default app;