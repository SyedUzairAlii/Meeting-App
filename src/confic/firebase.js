import * as firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCeIpw_OC0VDX-KKn3FrMRsibU7hsB7h6Y",
    authDomain: "meeting-app-bf1a9.firebaseapp.com",
    databaseURL: "https://meeting-app-bf1a9.firebaseio.com",
    projectId: "meeting-app-bf1a9",
    storageBucket: "",
    messagingSenderId: "858534108255"
  };
  firebase.initializeApp(config);


  export default firebase