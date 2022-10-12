require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter } = require('./utils/config');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const app = express();
const { PORT = 9000 } = process.env;
const { DB = 'mongodb://localhost:27017/moviesdb' } = process.env;
mongoose.connect(DB);

// const limiter = rateLimit();

// Боди-парсер
app.use(bodyParser.json());

// CORS
app.use(cors());

// Логгер запросов
app.use(requestLogger);

// Лимитер запросов
app.use(limiter); // подключаем rate-limiter

// Роуты
app.use('/', routes);

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(errorHandler);

// Запуск сервера
// app.listen(PORT);

app.listen(PORT, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  } else {
    // eslint-disable-next-line no-console
    console.log(`listening port ${PORT}`);
  }
});
