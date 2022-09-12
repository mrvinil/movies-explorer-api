module.exports = {
  main: {
    internalServerError: 'Внутренняя ошибка сервера!',
    accessDenied: 'Недостаточно прав',
  },
  auth: {
    unauthorized: 'Необходима авторизация',
  },
  logout: {
    logoutSuccess: 'Вы успешно вышли из аккаунта',
  },
  user: {
    notFoundUser: 'Пользователь по указанному id не найден',
    notObjectIdUser: 'Некорректный id пользователя',
    incorrectUserDataCreate: 'Переданы некорректные данные при создании пользователя',
    incorrectUserDataUpdate: 'Переданы некорректные данные при обновлении профиля',
    notUniqueEmail: 'Email уже зарегистрирован',
  },
  movie: {
    incorrectMovieData: 'Переданы некорректные данные при создании фильма',
    notFoundMovie: 'Такого фильма не существует',
    notObjectIdMovie: 'Переданы некорректные данные при удалении фильма',
  },
  routes: {
    notFoundAddress: 'Адреса не существует',
  },
};
