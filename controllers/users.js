const { constants } = require('http2');
const User = require('../models/users');

// Получаем всех пользователей.
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${err}` }));
};

// Получаем пользователя по id.
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Некорректный id: ${err}` });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

// Создаем пользователя.
module.exports.createUser = (req, res) => {
  // Получаем данные из req.body.
  const { name, about, avatar } = req.body;

  // Создаем запись в БД и обрабатываем ошибку.
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

// Обновляем профиль пользователя.
module.exports.updateUser = (req, res) => {
  // Получаем данные из req.body.
  const { name, about } = req.body;
  const userId = req.user._id;
  // Создаем запись в БД и обрабатываем ошибку.
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err}` });
      } else if (err.name === 'CastError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Некорректный id: ${err}` });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

// Обновляем аватар пользователя.
module.exports.updateUserAvatar = (req, res) => {
  // Получаем данные из req.body.
  const { avatar } = req.body;
  const userId = req.user._id;
  // Создаем запись в БД и обрабатываем ошибку.
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err}` });
      } else if (err.name === 'CastError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Некорректный id: ${err}` });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};
