 // Get the movie data and populate the movie list and the first movie details
 fetch('http://localhost:3000/films')
 .then(response => response.json())
 .then(data => {
   const films = document.querySelector('#films');
   films.innerHTML = ''; // Remove the placeholder element
   data.forEach(film => {
     const li = document.createElement('li');
     li.classList.add('film', 'item');
     li.innerText = film.title;
     li.addEventListener('click', () => showMovieDetails(film));
     films.appendChild(li);
   });

   // Show the first movie details by default
   showMovieDetails(data[0]);
 });

// Show the movie details for a given movie object
function showMovieDetails(movie) {
    const poster = document.querySelector('#poster');
    const title = document.querySelector('#title');
    const runtime = document.querySelector('#runtime');
    const showtime = document.querySelector('#showtime');
    const tickets = document.querySelector('#tickets');
    const buyTicket = document.querySelector('#buy-ticket');
   
    poster.src = movie.poster;
    title.innerText = movie.title;
    runtime.innerText = `Runtime: ${movie.runtime} min`;
    showtime.innerText = `Showtime: ${movie.showtime}`;
    const availableTickets = movie.capacity - movie.tickets_sold;
    tickets.innerText = `Tickets available: ${availableTickets}`;
    buyTicket.disabled = availableTickets === 0;
   
    // Add a click listener to the "Buy Ticket" button
    buyTicket.removeEventListener('click', buyTicketHandler);
    buyTicket.addEventListener('click', buyTicketHandler);
   
    // Function to handle the "Buy Ticket" button click
    const button = document.createElement("button");
   button.textContent = "Buy Tickets";
   button.addEventListener("click" , () =>  {
      if(availableTickets>0){
       availableTickets -- 
      } 
      if(availableTickets === 0){
       button.textContent = "Sold Out"
       button.disabled = true;
      }

      else{
       button.textContent="Buy Tickets"
      }
     
      availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
   });
   }
   
