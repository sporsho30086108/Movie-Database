const express = require('express');
const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require('../controllers/movie.controller');

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
