// Импорты
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/movie');

// Возвращает все сохранённые текущим  пользователем фильмы
function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
}
// Создаёт фильм
function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError({
            message: 'Переданы некорректные данные при создании записи о фильме.',
          }),
        );
      }
      return next(err);
    });
}
// Удаляет сохранённый фильм по id
function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError({ message: 'Запись о фильме с указанным _id не найдена.' }))
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError({ message: 'Вы не являетесь автором записи о фильме.' }));
      }
      return Movie.findByIdAndRemove(req.params.movieId).then(() => {
        res.send({ message: 'Запись о фильме удалёна.' });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError({
            message: 'Передан некорректный _id фильма.',
          }),
        );
      }
      return next(err);
    });
}

module.exports = { getMovies, createMovie, deleteMovie };
