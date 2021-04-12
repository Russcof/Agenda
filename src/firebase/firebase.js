import firebase from 'firebase/app';

//FIRBASE API CONFIG
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

export default fire;
