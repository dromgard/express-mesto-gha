const { constants } = require('http2');
const Card = require('../models/cards');

// Получаем все карточки.
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${err}` }));
};

// Создаём карточку.
module.exports.createCard = (req, res) => {
  // Получаем данные из req.body.
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

// Удаляем карточку.
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
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

// Ставим лайк карточке.
module.exports.likeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
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

// Удаляем лайк у карточки.
module.exports.dislikeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
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
