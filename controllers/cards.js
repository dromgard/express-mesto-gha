const Card = require('../models/cards');

// Получаем все карточки.
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

// Создаём карточку.
module.exports.createCard = (req, res) => {
  // Получаем данные из req.body.
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

// Удаляем карточку.
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};
