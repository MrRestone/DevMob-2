// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjzeuGqn0YknnbFUOk37gR1s2WGKCSD_0",
  authDomain: "projeto-mobile-3ac08.firebaseapp.com",
  projectId: "projeto-mobile-3ac08",
  storageBucket: "projeto-mobile-3ac08.appspot.com",
  messagingSenderId: "363589165323",
  appId: "1:363589165323:web:b746362826d0dbb2adc20e",
  measurementId: "G-CVGBFRMQZF",
  databaseURL:"https://projeto-mobile-3ac08-default-rtdb.firebaseio.com/"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app