const router = require('express').Router();

const { getCards, createCard, deleteCard } = require('../controllers/cards');

// Получаем все карточки.
router.get('/', getCards);

// Создаём карточку.
router.post('/', createCard);

// Удаляем карточку.
router.delete('/:cardId', deleteCard);

module.exports = router;
