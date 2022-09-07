const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ApiError = require('../errors/ApiError');

const { NODE_ENV, JWT_SECRET } = process.env;

// ищем пользователя по ID
function findUserById(id, res, next) {
  User.findById(id)
    .then((user) => {
      if (!user) {
        return next(ApiError.NotFoundError('Пользователь по указанному id не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(ApiError.BadRequestError('Некорректный id пользователя'));
      }
      return next(err);
    });
}

// создаем пользователя
const createUser = (req, res, next) => {
  const { name, email, password, } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(ApiError.BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(ApiError.Conflict('Email уже зарегистрирован'));
      }
      return next(err);
    });
};

// получаем пользователя по ID
const getUser = (req, res, next) => {
  const { id } = req.params;
  findUserById(id, res, next);
};

// обновляем данные пользователя
const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(ApiError.NotFoundError('Пользователь по указанному id не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(ApiError.BadRequestError('Переданы некорректные данные при обновлении профиля'));
      }
      return next(err);
    });
};

// функция авторизации
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
      })
        .send({ token });
    })
    .catch(next);
};

// функция разлогина
const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы успешно вышли из аккаунта' });
};

module.exports = {
  getUser, createUser, updateUserInfo, login, logout,
};
