import firebase from "firebase";
import "firebase/auth"
import "firebase/firestore";



const firebaseConfig = firebase.initializeApp ({
    apiKey: "AIzaSyBuUAT_fOpN4PAYCE35qmrwF2NGe8L60VU",
    authDomain: "django-react-8a05d.firebaseapp.com",
    databaseURL: "https://django-react-8a05d-default-rtdb.firebaseio.com",
    projectId: "django-react-8a05d",
    storageBucket: "django-react-8a05d.appspot.com",
    messagingSenderId: "49618314986",
    appId: "1:49618314986:web:37eb5d32054cf8d6e1d993"
    });

    
  export const auth = firebaseConfig.auth()
  export const db = firebaseConfig.firestore() 
  export default firebaseConfig