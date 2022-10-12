const { celebrate, Joi } = require('celebrate');

// Кастомная валидация mongoose id
function validateId(id, helper) {
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    return id;
  }
  return helper.message('Передан некорретный id.');
}

// Кастомная валидация email
function validateEmail(email, helper) {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return email;
  }
  return helper.message('Некорректный адрес электронной почты.');
}

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail)
      .messages({
        'any.required': 'Поле E-mail обязательно для заполнения.',
        'string.custom': 'Некорректный адрес электронной почты.',
      }),
    password: Joi.string().required().min(6).max(30)
      .messages({
        'any.required': 'Поле Пароль обязательно для заполнения.',
        'string.min': 'Поле Пароль не должно быть короче 6 символов.',
        'string.max': 'Поле Пароль не должно быть длиннее 30 символов.',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле Имя обязательно для заполнения.',
        'string.min': 'Поле Имя не должно быть короче 2 символов.',
        'string.max': 'Поле Имя не должно быть длиннее 30 символов.',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail)
      .messages({
        'any.required': 'Поле E-mail обязательно для заполнения.',
        'string.custom': 'Некорректный адрес электронной почты.',
      }),
    password: Joi.string().required().min(6).max(30)
      .messages({
        'any.required': 'Поле Пароль обязательно для заполнения.',
        'string.min': 'Поле Пароль не должно быть короче 6 символов.',
        'string.max': 'Поле Пароль не должно быть длиннее 30 символов.',
      }),
  }),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail)
      .messages({
        'any.required': 'Поле E-mail обязательно для заполнения.',
        'string.custom': 'Некорректный адрес электронной почты.',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле Имя обязательно для заполнения.',
        'string.min': 'Поле Имя не должно быть короче 2 символов.',
        'string.max': 'Поле Имя не должно быть длиннее 30 символов.',
      }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': 'Не передано поле "Страна".',
    }),
    director: Joi.string().required().messages({
      'any.required': 'Не передано поле "Режиссер".',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Не передано поле "Длительность".',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Не передано поле "Год производства".',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Не передано поле "Описание".',
    }),
    image: Joi.string().required().uri().messages({
      'any.required': 'Не передано поле "Изображение".',
      'string.uri': 'Поле "Изображение" не является ссылкой.',
    }),
    trailerLink: Joi.string().required().uri().messages({
      'any.required': 'Не передано поле "Трейлер".',
      'string.uri': 'Поле "Трейлер" не является ссылкой.',
    }),
    thumbnail: Joi.string().required().uri().messages({
      'any.required': 'Не передано поле "Превью".',
      'string.uri': 'Поле "Превью" не является ссылкой.',
    }),
    movieId: Joi.number().required().messages({
      'any.required': 'Не передано поле "id".',
    }),
    nameRU: Joi.string().required().messages({
      'any.required': 'Не передано поле "Имя".',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Не передано поле "Name".',
    }),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom(validateId).messages({
      'any.required': 'Не передан id удаляемого фильма.',
      'string.custom': 'Некорректный id фильма.',
    }),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateUserInfo,
  validateCreateMovie,
  validateDeleteMovie,
};
