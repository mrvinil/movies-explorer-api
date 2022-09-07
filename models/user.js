const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const ApiError = require('../errors/ApiError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email обязателен для заполнения'],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен для заполнения'],
    select: false,
  },
  name: {
    type: String,
    minLength: [2, 'Имя должно содержать минимум 2 символа, вы ввели {VALUE}'],
    maxLength: [30, 'Имя должно содержать максимум 30 символов, вы ввели {VALUE}'],
    default: 'Жак-Ив Кусто',
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ApiError.Unauthorized('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ApiError.Unauthorized('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
