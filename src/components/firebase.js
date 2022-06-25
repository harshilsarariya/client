// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1gf0JBjHL03ZbFnNSLA-uV1D8uldNJ0s",
  authDomain: "ideal-60a5d.firebaseapp.com",
  projectId: "ideal-60a5d",
  storageBucket: "ideal-60a5d.appspot.com",
  messagingSenderId: "70892552112",
  appId: "1:70892552112:web:8a829bd5c291db6fdea075",
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { auth, firebase };
