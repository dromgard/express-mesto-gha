const router = require('express').Router();

// Получаем схемы валидации входящих запросов через celebrate.
const { celebrateChangeAvatar, celebrateChangeProfile, celebrateUserId } = require('../validators/users');

// Получаем данные функций обработчиков запросов из "/controllers".
const {
  getUsers,
  getUserById,
  // createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

// Получаем всех пользователей.
router.get('/', getUsers);

// Получаем пользователя по id.
router.get('/:userId', celebrateUserId, getUserById);

// Создаем пользователя.
// router.post('/', createUser);

// Обновляем профиль пользователя.
router.patch('/me', celebrateChangeProfile, updateUser);

// Обновляем аватар пользователя.
router.patch('/me/avatar', celebrateChangeAvatar, updateUserAvatar);

module.exports = router;
