const ApiError = require('../errors/ApiError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Непредвиденная ошибка!' });
  }
  next();
};

module.exports = errorHandler;
