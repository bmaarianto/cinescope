document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const movieList = document.getElementById("movie-list");

  searchButton.addEventListener("click", function () {
    const keyword = searchInput.value.trim();
    if (keyword !== "") {
      searchMovies(keyword);
    }
  });

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });

  movieList.addEventListener("click", function (e) {
    if (e.target.classList.contains("show-detail-button")) {
      const imdbID = e.target.getAttribute("data-id");
      showMovieDetail(imdbID);
    }
  });

  function searchMovies(keyword) {
    fetch(`https://www.omdbapi.com/?apikey=874a7130&s=${encodeURIComponent(keyword)}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.Response === "True") {
          const movies = result.Search;
          let cards = "";
          movies.forEach((movie) => {
            cards += `
              <div class="col-sm-6 col-md-4 col-lg-3">
                  <div class="card movie-card h-100">
                      <img src="${
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/300x400"
                      }" class="card-img-top" alt="${movie.Title}">
                      <div class="card-body">
                          <h6 class="card-title">${movie.Title}</h6>
                          <p class="card-subtitle mb-2 text-muted">${movie.Year}</p>
                          <button class="btn btn-primary show-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-id="${
                            movie.imdbID
                          }">Show Details</button>
                      </div>
                  </div>
              </div>`;
          });
          movieList.innerHTML = cards;
        } else {
          movieList.innerHTML = `<p class="text-center text-danger">${result.Error}</p>`;
        }
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }

  function showMovieDetail(id) {
    fetch(`https://www.omdbapi.com/?apikey=874a7130&i=${encodeURIComponent(id)}`)
      .then((response) => response.json())
      .then((movie) => {
        document.getElementById("movieDetailModalLabel").textContent = movie.Title;
        document.getElementById("modal-poster").src =
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x400";
        document.getElementById("modal-plot").textContent = movie.Plot;
        document.getElementById("modal-released").textContent = movie.Released;
        document.getElementById("modal-genre").textContent = movie.Genre;
        document.getElementById("modal-director").textContent = movie.Director;
        document.getElementById("modal-actors").textContent = movie.Actors;
        document.getElementById("modal-rating").textContent = movie.imdbRating;
      })
      .catch((error) => {
        console.error("Error fetching movie detail:", error);
      });
  }
});
