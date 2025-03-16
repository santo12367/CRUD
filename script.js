

// Get references to the elements
const movieForm = document.getElementById('movieForm');
const movieTitle = document.getElementById('movieTitle');
const movieDirector = document.getElementById('movieDirector');
const movieYear = document.getElementById('movieYear');
const movieTableBody = document.getElementById('movieTable').getElementsByTagName('tbody')[0];

// Movie array to store movie objects
let movies = JSON.parse(localStorage.getItem('movies')) || [];

// Function to render the movie list to the table
function renderMovieList() {
    movieTableBody.innerHTML = '';

    movies.forEach((movie, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.director}</td>
            <td>${movie.year}</td>
            <td>
                <button class="edit-btn" onclick="editMovie(${index})">Edit</button>
                <button onclick="deleteMovie(${index})">Delete</button>
            </td>
        `;
        movieTableBody.appendChild(row);
    });
}

// Add new movie
movieForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const newMovie = {
        title: movieTitle.value,
        director: movieDirector.value,
        year: movieYear.value,
    };

    movies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(movies));

    movieTitle.value = '';
    movieDirector.value = '';
    movieYear.value = '';

    renderMovieList();
});

// Delete movie
function deleteMovie(index) {
    movies.splice(index, 1);
    localStorage.setItem('movies', JSON.stringify(movies));
    renderMovieList();
}

// Edit movie
function editMovie(index) {
    const movie = movies[index];
    movieTitle.value = movie.title;
    movieDirector.value = movie.director;
    movieYear.value = movie.year;

    // Remove the movie from the list so it can be updated
    deleteMovie(index);
}

// Initial render of the movie list
renderMovieList();
