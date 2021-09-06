import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
    
    apiKey: "AIzaSyAdynpv2S4nVwT6X3rx-V3xnXjVz40qjMI",
    authDomain: "nft-auction.firebaseapp.com",
    databaseURL: "https://nft-auction-default-rtdb.firebaseio.com",
    projectId: "nft-auction",
    storageBucket: "nft-auction.appspot.com",
    messagingSenderId: "122755683337",
    appId: "1:122755683337:web:fd2e3ac7553363954854d8"
    
    });


  /* export const auth = firebase.auth()
  export const db = firebase.firestore() */
  export default firebaseConfig