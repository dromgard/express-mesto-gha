const router = require('express').Router();

// Получаем данные функций обработчиков запросов из "/controllers".
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

// Получаем всех пользователей.
router.get('/', getUsers);

// Получаем пользователя по id.
router.get('/:userId', getUserById);

// Создаем пользователя.
router.post('/', createUser);

// Обновляем профиль пользователя.
router.patch('/me', updateUser);

// Обновляем аватар пользователя.
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
