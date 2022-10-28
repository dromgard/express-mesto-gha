const router = require('express').Router();

// Получаем данные функций обработчиков запросов из "/controllers".
const { getUsers, getUserById, createUser } = require('../controllers/users');

// Получаем всех пользователей.
router.get('/', getUsers);

// Получаем пользователя по id.
router.get('/:userId', getUserById);

// Создаем пользователя.
router.post('/', createUser);

module.exports = router;
