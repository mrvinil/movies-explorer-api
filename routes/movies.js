const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, idValidator } = require('../middlewares/validate');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:id', idValidator, deleteMovie);

module.exports = router;
