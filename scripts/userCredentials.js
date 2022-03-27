import { auth } from "./firebase.js"
import { signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"



auth.onAuthStateChanged((user) => {
    const navbarList = document.getElementById("navbar-list")
    if (!user) {
        navbarList.innerHTML = `<li class="nav-item">
        <a href="login.html" class="nav-link">Log In</a>
    </li>
    <li class="nav-item">
        <a href="signup.html" class="nav-link">Sign Up</a>
    </li>
    <li class="nav-item">
        <a href="reviews.html" class="nav-link">Reviews</a>
    </li>`
    } else {
        navbarList.innerHTML = `
        <li class="nav-item">
        <a href="index.html" class="nav-link" id="logout">Log out</a>
    </li>
    <li class="nav-item">
        <a href="reviews.html" class="nav-link">Reviews</a>
    </li>
    <li class="nav-item">
        <a href="review.html" class="nav-link">Review a movie</a>
    </li>`
        document.getElementById("logout").addEventListener("click", () => {
            signOut(auth)
        })
    }

})



