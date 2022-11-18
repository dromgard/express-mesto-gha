const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Проверяем есть ли токен в заголовке.
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }

  // Если есть, обрезаем, оставляя только токен.
  const token = authorization.replace('Bearer ', '');
  let payload;

  // Попытаемся верифицировать токен
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // Отправим ошибку, если не получилось
    next(new UnauthorizedError('Необходима авторизация.'));
  }

  // записываем пейлоуд в объект запроса
  req.user = payload;

  next();
};
