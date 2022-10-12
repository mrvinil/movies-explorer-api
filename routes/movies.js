const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/requestValidation');

// Возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);
// Создаёт фильм
router.post('/', validateCreateMovie, createMovie);
// Удаляет сохранённый фильм по id
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
