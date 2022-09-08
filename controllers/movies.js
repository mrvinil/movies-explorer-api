const Movie = require('../models/movie');
const ApiError = require('../errors/ApiError');
const errorMessage = require('../utils/errorMessage');

// создаем фильм
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(ApiError.BadRequestError(errorMessage.movie.incorrectMovieData));
      }
      return next(err);
    });
};

// получаем избранные фильмы
const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

// удаляем фильм из избранных
const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        return next(ApiError.NotFoundError(errorMessage.movie.notFoundMovie));
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        return next(ApiError.Forbidden(errorMessage.main.accessDenied));
      }
      return Movie.findByIdAndRemove(id)
        .then((data) => res.send(data))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(ApiError.BadRequestError(errorMessage.movie.notObjectIdMovie));
      }
      return next(err);
    });
};

module.exports = {
  createMovie, getMovies, deleteMovie,
};
