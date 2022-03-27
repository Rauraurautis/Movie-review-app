import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyANDIlxNOGnwyUDtY9rU-MDfEkf5gTZhLw",
    authDomain: "moviereviewproject-7b1c4.firebaseapp.com",
    databaseURL: "https://moviereviewproject-7b1c4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "moviereviewproject-7b1c4",
    storageBucket: "moviereviewproject-7b1c4.appspot.com",
    messagingSenderId: "553444433622",
    appId: "1:553444433622:web:8f9ee3b81e52a4d9997377"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()