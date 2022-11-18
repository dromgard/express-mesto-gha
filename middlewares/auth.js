const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Проверяем есть ли токен в заголовке.
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация555' });
  }

  // Если есть, обрезаем, оставляя только токен.
  const token = authorization.replace('Bearer ', '');
  let payload;

  // Попытаемся верифицировать токен
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // Отправим ошибку, если не получилось
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  // записываем пейлоуд в объект запроса
  req.user = payload;

  next();
};
