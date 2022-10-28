const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// Получаем все карточки.
router.get('/', getCards);

// Создаём карточку.
router.post('/', createCard);

// Удаляем карточку.
router.delete('/:cardId', deleteCard);

// Ставим лайк карточке.
router.put('/:cardId/likes', likeCard);

// Удаляем лайк у карточки.
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
