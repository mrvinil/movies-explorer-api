const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Не передано поле "Страна".'],
    },
    director: {
      type: String,
      required: [true, 'Не передано поле "Режиссер".'],
    },
    duration: {
      type: Number,
      required: [true, 'Не передано поле "Длительность".'],
    },
    year: {
      type: String,
      required: [true, 'Не передано поле "Год выпуска".'],
    },
    description: {
      type: String,
      required: [true, 'Не передано поле "Описание".'],
    },
    image: {
      type: String,
      required: [true, 'Не передано поле "Постер".'],
      validate: {
        validator(link) {
          return validator.isURL(link);
        },
        message: ({ value }) => `${value} некорректный URL постера.`,
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Не передано поле "Трейлер".'],
      validate: {
        validator(link) {
          return validator.isURL(link);
        },
        message: ({ value }) => `${value} некорректный URL трейлера фильма.`,
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Не передано поле "Миниатюрный постер".'],
      validate: {
        validator(link) {
          return validator.isURL(link);
        },
        message: ({ value }) => `${value} некорректный URL миниатюрного постера.`,
      },
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Не передано поле "Создатель".'],
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: [true, 'Не передано поле "ID фильма".'],
    },
    nameRU: {
      type: String,
      required: [true, 'Не передано поле "Название на русском языке".'],
    },
    nameEN: {
      type: String,
      required: [true, 'Не передано поле "Название на английском языке".'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
