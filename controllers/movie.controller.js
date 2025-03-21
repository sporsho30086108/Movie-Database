const fs = require('fs');
const path = require('path');

const moviesFile = path.join(__dirname, '../data/movies.json');

// Helper function to read movie data
const getMoviesData = () => {
  const data = fs.readFileSync(moviesFile);
  return JSON.parse(data);
};

// Helper function to write movie data
const saveMoviesData = (data) => {
  fs.writeFileSync(moviesFile, JSON.stringify(data, null, 2));
};

// Get all movies
exports.getMovies = (req, res) => {
  res.json(getMoviesData());
};

// Get movie by ID
exports.getMovieById = (req, res) => {
  const movies = getMoviesData();
  const movie = movies.find(m => m.id == req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json(movie);
};

// Add new movie
exports.createMovie = (req, res) => {
  const movies = getMoviesData();
  const newMovie = { id: movies.length + 1, ...req.body };
  movies.push(newMovie);
  saveMoviesData(movies);
  res.status(201).json(newMovie);
};

// Update a movie
exports.updateMovie = (req, res) => {
  let movies = getMoviesData();
  const index = movies.findIndex(m => m.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Movie not found" });

  movies[index] = { ...movies[index], ...req.body };
  saveMoviesData(movies);
  res.json(movies[index]);
};

// Delete a movie
exports.deleteMovie = (req, res) => {
  let movies = getMoviesData();
  movies = movies.filter(m => m.id != req.params.id);
  saveMoviesData(movies);
  res.json({ message: "Movie deleted" });
};
