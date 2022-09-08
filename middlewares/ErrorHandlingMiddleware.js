const ApiError = require('../errors/ApiError');
const errorMessage = require('../utils/errorMessage');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: errorMessage.main.internalServerError });
  }
  next();
};

module.exports = errorHandler;
