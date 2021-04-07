import firebase from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyCqZjBnmzFZuYj0V7grYlsVQ8ZFmjdje7g",
    authDomain: "agenda-9d535.firebaseapp.com",
    projectId: "agenda-9d535",
    storageBucket: "agenda-9d535.appspot.com",
    messagingSenderId: "1079859154982",
    appId: "1:1079859154982:web:4c1a9318b74863c61ad6e7"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

export default fire;