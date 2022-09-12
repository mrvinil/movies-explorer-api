const jwt = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');
const errorMessage = require('../utils/errorMessage');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(ApiError.Unauthorized(errorMessage.auth.unauthorized));
  }

  req.user = payload;
  return next();
};
