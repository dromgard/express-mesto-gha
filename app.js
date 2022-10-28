const express = require('express');
const mongoose = require('mongoose');
const { constants } = require('http2');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

// Обработка res.body в json.
app.use(bodyParser.json());

// Мидлвэр временное решение авторизации.
app.use((req, res, next) => {
  req.user = {
    _id: '635a992a1c196280f4fc6e59',
  };

  next();
});

// Обрабатываем роуты пользователей - "/users".
app.use('/users', require('./routes/users'));

// Обрабатываем роуты карточек - "/cards".
app.use('/cards', require('./routes/cards'));

// Обрабатываем несуществующие роуты.
app.use((req, res) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
