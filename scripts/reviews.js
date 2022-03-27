
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
        import { getDatabase, ref, set, child, get, update, remove, onValue, push } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"
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

        const moviecards = document.getElementById("moviecards")
        const modalTitle = document.getElementById("modal-title")
        const modalBody = document.getElementById("modal-body")
        const searchInput = document.getElementById("searchInput")
        const searchBtn = document.getElementById("searchBtn")
        const showAllBtn = document.getElementById("showAllBtn")
        const movietitle = document.getElementById("movietitle")


        let movieData = []

        const getStars = (stars, size) => {
            let emptyStars = 5 - stars
            let starsStr = ""
            for (stars; stars > 0; stars--) {
                starsStr += `<i class="rating__star fas fa-star px-1 ${size}"></i>`
            }
            for (emptyStars; emptyStars > 0; emptyStars--) {
                starsStr += `<i class="rating__star far fa-star px-1 ${size}"></i>`
            }
            return starsStr
        }

        const getAllReviews = () => {
            moviecards.innerHTML = ""
            movieData = []
            const reviewsRef = ref(db, "/moviereviews/")
            onValue(reviewsRef, (childSnapshot) => {
                const data = childSnapshot.val()
                let sameMovieCounter = 0
                Object.values(data).forEach((movie, i) => {
                    let index = i + sameMovieCounter
                    Object.values(movie).forEach((single, i) => {
                        if (movieData.filter(movie => movie.name === single.name).length > 0) {
                            sameMovieCounter++
                            index++
                        } 
                        movieData.push(single)
                        moviecards.innerHTML += `<div class="card ${index} bg-dark text-light col-3 m-1 moviereview overflow-hidden " style=" max-height: 305px; min-width: 173px; min-height: 200px; " data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <div class="card-body ${index}">
                      <h5 class="card-title ${index}" >${single.name}</h5>
                      <h5 class="card-subtitle ${index} py-2  rating d-none d-sm-block" style="white-space: nowrap;">${getStars(single.stars, "fa-sm")}</h5>
                      <h5 class="card-subtitle ${index} rating d-sm-none" style="white-space: nowrap;">${getStars(single.stars, "fa-2xs")}</h5>
                      
                      <p class="card-text ${index} ">${single.review.substring(0, 200)}...</p>
                    </div>
                  </div>`
                    })
                })
            }
            )
        }

        getAllReviews()

        const getMoviesBySearch = (search) => {
            if (search === "") return
            moviecards.innerHTML = ""
            movieData = []
            const reviewsRef = ref(db, "/moviereviews/" + (search.charAt(0).toUpperCase() + search.slice(1).toLowerCase()))
            onValue(reviewsRef, (childSnapshot) => {
                const data = childSnapshot.val()
                Object.values(data).forEach((movie, i) => {
                    movieData.push(movie)
                    moviecards.innerHTML += `<div class="card ${i} bg-dark text-light col-3 mt-4 m-1 moviereview overflow-hidden " style="width: 24%; max-height: 305px; min-width: 173px " data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <div class="card-body ${i}">
                      <h5 class="card-title ${i}">${movie.name}</h5>
                      <h5 class="card-subtitle ${i} py-2  rating d-none d-sm-block" style="white-space: nowrap;">${getStars(movie.stars, "fa-sm")}</h5>
                      <h5 class="card-subtitle ${i} rating d-sm-none" style="white-space: nowrap;">${getStars(movie.stars, "fa-2xs")}</h5>
                      <p class="card-text ${i}">${movie.review.substring(0, 200)}...</p>
                    </div>
                  </div>`
                })
            })
        }

        searchBtn.addEventListener("click", () => {
            const movieName = searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase()
            if (movieName === "") {
                return getAllReviews()
            }
            getMoviesBySearch(movieName)

        })

        showAllBtn.addEventListener("click", () => {
            getAllReviews()
        })


        moviecards.addEventListener("click", (e) => {
            const reviewIndex = e.target.className.split(" ")[1]
            const movie = movieData[reviewIndex]
            modalTitle.innerHTML = `<p>${movie.name}</p> <div>${getStars(movie.stars, "fa-sm")}</div>`
            modalBody.innerText = movie.review
        })