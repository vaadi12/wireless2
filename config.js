import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA_V5-St4NyJ1gKuolyjW2IiWcNzOF2S4s",
    authDomain: "wireleibrary-7d2e0.firebaseapp.com",
    projectId: "wireleibrary-7d2e0",
    storageBucket: "wireleibrary-7d2e0.appspot.com",
    messagingSenderId: "477400102548",
    appId: "1:477400102548:web:85183efe91c2fb344b6681"
  };

  firebase.initializeApp(firebaseConfig)
  export default firebase.firestore()