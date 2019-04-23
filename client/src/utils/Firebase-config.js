import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBkug0nYsWIqT_McQq3Cv6AdtLs8Ud0hNg",
    authDomain: "workr-app-5a257.firebaseapp.com",
    databaseURL: "https://workr-app-5a257.firebaseio.com",
    projectId: "workr-app-5a257",
    storageBucket: "workr-app-5a257.appspot.com",
    messagingSenderId: "1077208436627"
  };

  firebase.initializeApp(config);

  const storage = firebase.storage();

  export default { storage, firebase };