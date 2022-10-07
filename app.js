require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/ErrorHandlingMiddleware');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { databaseUrl } = require('./utils/database');
const limiter = require('./utils/limiter');
const corsOptions = require('./utils/cors');

const { PORT = 9000 } = process.env;

// подключаемся к БД
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// запуск приложения
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// защита заголовков
app.use(helmet());

app.use(cors(corsOptions));

// логгер запросов нужно подключить до всех обработчиков роутов:
app.use(requestLogger); // подключаем логгер запросов

// IP лимитер
app.use(limiter);

// используем роуты
app.use(routes);

// логгер ошибок нужно подключить после обработчиков роутов и до обработчиков ошибок:
app.use(errorLogger); // подключаем логгер ошибок

// обработчик ошибок celebrate
app.use(errors());
app.use(errorHandler);

// слушаем порт
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`приложение запущено на порту ${PORT}`);
  }
});
