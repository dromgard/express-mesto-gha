const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

// Получаем данные функций обработчиков запросов из "/controllers".
const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');

// Получаем схемы валидации входящих запросов через celebrate.
const { celebrateCreateUser, celebrateLoginUser } = require('./validators/users');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.set({ runValidators: true });
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// Обработка res.body в json.
app.use(bodyParser.json());

// Обрабатываем логин.
app.post('/signin', celebrateLoginUser, login);

// Обрабатываем регистрацию.
app.post('/signup', celebrateCreateUser, createUser);

app.use(auth);

// Обрабатываем роуты пользователей - "/users".
app.use('/users', require('./routes/users'));

// Обрабатываем роуты карточек - "/cards".
app.use('/cards', require('./routes/cards'));

// Обрабатываем несуществующие роуты.
app.use((req, res, next) => next(new NotFoundError('Страница не найдена.')));

// Обработчик ошибок celebrate.
app.use(errors());

// Централизованный обработчик ошибок.
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  console.log('err.statusCode', err.statusCode);
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
