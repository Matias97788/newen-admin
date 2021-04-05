import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyBLoyUIZUtJMGxzfSFgtpXek_cWhhKVzow",
    authDomain: "mapudung.firebaseapp.com",
    databaseURL: "https://mapudung-default-rtdb.firebaseio.com",
    projectId: "mapudung",
    storageBucket: "mapudung.appspot.com",
    messagingSenderId: "439567609871",
    appId: "1:439567609871:web:687f63b240e0750573f37a"
  };
  var fireBD =firebase.initializeApp(firebaseConfig);

  export default fireBD.database().ref();


 