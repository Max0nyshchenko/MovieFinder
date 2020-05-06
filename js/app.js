$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('.searchText').val();

    getMovies(searchText);

    e.preventDefault();
  });

  $('#submitBtn').click(() => {
    let searchText = $('.searchText').val();

    getMovies(searchText);
  });

  $(window).change(setCartHeight);
  $(window).resize(setCartHeight);
});

function getMovies(searchText) {
  axios
    .get(`http://www.omdbapi.com/?i=tt3896198&apikey=b46cbf9c&s=${searchText}`)
    .then((response) => {
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (idx, movie) => {
        output += `
            <div class="col-md-3 card border-primary mb-3">
              <div class="well text-center">
                <img class="Poster" src="${movie.Poster}" />
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
            </div>
        `;
      });
      $('#movies').hide();
      $('#movies').html(output);
      $('#movies').fadeIn(1500);

      setCartHeight();
    })
    .catch((err) => {
      console.log(err);
    });
}

function setCartHeight() {
  const posterArr = document.querySelectorAll('.Poster');
  posterArr.forEach((item) => {
    let heit =
      item.parentElement.offsetHeight -
      item.nextElementSibling.offsetHeight -
      item.nextElementSibling.nextElementSibling.offsetHeight;
    item.style.height = heit + 'px';
  });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios
    .get(`http://www.omdbapi.com/?i=${movieId}&apikey=b46cbf9c&`)
    .then((response) => {
      let movie = response.data;

      let output = `
        <div class="row">
          <div class="col-md-4>
            <img src="${movie.Poster}" class="thumbnail" />
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr />
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-primary">Go Back To Search</a>
          </div>
        </div>
       `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
