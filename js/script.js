document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "874a7130";
  const PLACEHOLDER_IMG = "https://via.placeholder.com/300x400";

  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const movieList = document.getElementById("movie-list");

  searchButton.addEventListener("click", () => {
    const keyword = searchInput.value.trim();
    if (keyword) searchMovies(keyword);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchButton.click();
  });

  movieList.addEventListener("click", (e) => {
    if (e.target.classList.contains("show-detail-button")) {
      const imdbID = e.target.dataset.id;
      showMovieDetail(imdbID);
    }
  });

  async function searchMovies(keyword) {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          keyword
        )}`
      );
      const result = await response.json();

      if (result.Response === "True") {
        movieList.innerHTML = result.Search.map(
          (movie) => `
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="card movie-card h-100">
              <img src="${
                movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_IMG
              }" class="card-img-top" alt="${movie.Title}">
              <div class="card-body">
                <h6 class="card-title">${movie.Title}</h6>
                <p class="card-subtitle mb-2 text-muted">${movie.Year}</p>
                <button class="btn btn-primary show-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-id="${
                  movie.imdbID
                }">
                  Show Details
                </button>
              </div>
            </div>
          </div>
        `
        ).join("");
      } else {
        movieList.innerHTML = `<p class="text-center text-danger">${result.Error}</p>`;
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }

  async function showMovieDetail(id) {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(id)}`
      );
      const movie = await response.json();

      document.getElementById("movieDetailModalLabel").textContent =
        movie.Title ?? "N/A";
      document.getElementById("modal-poster").src =
        movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_IMG;
      document.getElementById("modal-plot").textContent =
        movie.Plot ?? "No description.";
      document.getElementById("modal-released").textContent =
        movie.Released ?? "-";
      document.getElementById("modal-genre").textContent = movie.Genre ?? "-";
      document.getElementById("modal-director").textContent =
        movie.Director ?? "-";
      document.getElementById("modal-actors").textContent = movie.Actors ?? "-";
      document.getElementById("modal-rating").textContent =
        movie.imdbRating ?? "-";
    } catch (error) {
      console.error("Error fetching movie detail:", error);
    }
  }
});
