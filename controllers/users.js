const User = require('../models/users');

// Получаем всех пользователей.
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

// Получаем пользователя по id.
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

// Создаем пользователя.
module.exports.createUser = (req, res) => {
  // Получаем данные из req.body.
  const { name, about, avatar } = req.body;

  // Создаем запись в БД и обрабатываем ошибку.
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};
