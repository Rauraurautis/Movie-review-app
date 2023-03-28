import { app, auth } from "./firebase.js"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"

const email = document.getElementById("email")
const password = document.getElementById("password")
const loginBtn = document.getElementById("loginBtn")

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value).then(res => {
            alert("Succesfully logged in")
            window.location = "index.html"
        })
    } catch (err) {
        console.error(err)
    }

})


