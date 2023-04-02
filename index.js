document.addEventListener("DOMContentLoaded", function() {
    fetchMovieDetails();
    fetchMovieData();
  });
  
  async function fetchMovieDetails() {
    const response = await fetch("http://localhost:3000/films/1");
    const movie = await response.json();
    displayMovieDetails(movie);
  }
  
  function displayMovieDetails(movie) {
    const availableTickets = movie.capacity - movie.tickets_sold;
    const movieDetailsItemContainer = `
      <div class="movie-details-item">
        <img src="${movie.poster}">
        <p>Title: ${movie.title}</p>
        <p>Runtime: ${movie.runtime} minutes</p>
        <p>Showtime: ${movie.showtime}</p>
        <p>Available Tickets: ${availableTickets}</p>
      </div>
    `;
    document.getElementById("movie-details").innerHTML = movieDetailsItemContainer;
  }
  
  async function fetchMovieData() {
    const response = await fetch("http://localhost:3000/films");
    const movies = await response.json();
    displayMovies(movies);
  }
  
  function displayMovies(movies) {
    const movieList = document.getElementById("films");
    movieList.innerHTML = ""; // Remove any placeholder li elements
    movies.forEach(movie => {
      const li = document.createElement("li");
      li.classList.add("film-item");
      li.textContent = movie.title;
      movieList.appendChild(li);
    });
  }
  