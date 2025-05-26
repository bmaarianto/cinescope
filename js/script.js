function searchMovies(keyword) {
  $.ajax({
    url: "http://www.omdbapi.com/",
    data: {
      apikey: "874a7130",
      s: keyword,
    },
    success: function (result) {
      if (result.Response == "True") {
        const movies = result.Search;
        let cards = "";
        $.each(movies, function (i, movie) {
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
        $("#movie-list").html(cards);
      } else {
        $("#movie-list").html(
          `<p class="text-center text-danger">${result.Error}</p>`
        );
      }
    },
  });
}

function showMovieDetail(id) {
  $.ajax({
    url: "http://www.omdbapi.com/",
    data: {
      apikey: "874a7130",
      i: id,
    },
    success: function (movie) {
      $("#movieDetailModalLabel").text(movie.Title);
      $("#modal-poster").attr(
        "src",
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/300x400"
      );
      $("#modal-plot").text(movie.Plot);
      $("#modal-released").text(movie.Released);
      $("#modal-genre").text(movie.Genre);
      $("#modal-director").text(movie.Director);
      $("#modal-actors").text(movie.Actors);
      $("#modal-rating").text(movie.imdbRating);
    },
  });
}

$("#search-button").on("click", function () {
  const keyword = $("#search-input").val();
  if (keyword.trim() !== "") {
    searchMovies(keyword);
  }
});

$("#search-input").on("keypress", function (e) {
  if (e.which === 13) {
    $("#search-button").click();
  }
});

$("#movie-list").on("click", ".show-detail-button", function () {
  const imdbID = $(this).data("id");
  showMovieDetail(imdbID);
});
