import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyANDIlxNOGnwyUDtY9rU-MDfEkf5gTZhLw",
    authDomain: "moviereviewproject-7b1c4.firebaseapp.com",
    databaseURL: "https://moviereviewproject-7b1c4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "moviereviewproject-7b1c4",
    storageBucket: "moviereviewproject-7b1c4.appspot.com",
    messagingSenderId: "553444433622",
    appId: "1:553444433622:web:8f9ee3b81e52a4d9997377"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()

const email = document.getElementById("email")
const password = document.getElementById("password")
const signUpBtn = document.getElementById("signUpBtn")

const signup = async (e) => {
    e.preventDefault()
    try {
        await createUserWithEmailAndPassword(auth, email.value, password.value)
        alert("Succesfully created a new user!")
        window.location = "index.html"
    } catch (err) {
        console.error(err)
    }
}

signUpBtn.addEventListener("click", (e) => {
    signup(e)
})

