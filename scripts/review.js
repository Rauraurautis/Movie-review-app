
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
        import { getDatabase, ref, set, child, get, update, remove, onValue, push } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"
        import { getAuth, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
        import { auth } from "./firebase.js"
        import { signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
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
        const db = getDatabase(app)

        const movieName = document.getElementById("movieName")
        const movieReview = document.getElementById("review")
        const submitBtn = document.getElementById("submitBtn")

        const uploadReview = async (e) => {
            e.preventDefault()
            const review = movieReview.value
            const randomNumber = Math.floor(Math.random() * 100000);
            const fixedName = await movieName.value.charAt(0).toUpperCase() + movieName.value.slice(1).toLowerCase()
            if (fixedName.length < 2) {
                 alert("The movie name needs to be at least 2 characters long!")
                 return
            } else if (review.length < 15) {
                alert("Review needs to be at least 15 characters long!")
                return
            }
            if (fixedName.match(/[<>{}\"\"+r\/]/g)) return;
            if (review.match(/[<>{}\"\"+r]/g)) return;
            if (!stars) {
                alert("Set the amount of stars the movie deserves!")
                return
            }
            if (confirm(`Are you sure you would like to upload a review of the movie ${fixedName}?`)) {
                set(ref(db, `moviereviews/${fixedName}/${randomNumber}`), { name: fixedName, review: review, stars: stars, reviewer: userEmail })
                movieName.value = ""
                movieReview.value = ""
                ratingStars.map((star) => {
                    star.className = "rating__star far fa-star"
                })
            } else {
                return
            }
        }

        let userEmail = ""

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
            userEmail = user.email
        })

        
        submitBtn.addEventListener("click", (e) => uploadReview(e))

        // Arvostelutähdet

        let stars;

        const ratingStars = [...document.getElementsByClassName("rating__star")];
        const ratingResult = document.querySelector(".rating__result");

        setRatingResult(ratingResult);

        function executeRating(stars, result) {
            const starClassActive = "rating__star fas fa-star";
            const starClassUnactive = "rating__star far fa-star";
            const starsLength = stars.length;
            let i;
            stars.map((star, i) => {
                star.onclick = () => {
                    i = stars.indexOf(star);
                    if (star.className.indexOf(starClassUnactive) !== -1) {
                        setRatingResult(result, i + 1);
                        for (i; i >= 0; --i) stars[i].className = starClassActive;
                    } else {
                        setRatingResult(result, i);
                        for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
                    }
                };
            });
        }

        function setRatingResult(result, num = 0) {
            stars = num
        }

        executeRating(ratingStars, ratingResult);