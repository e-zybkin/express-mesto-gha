const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/ErrorUnautharized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
