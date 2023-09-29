const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { notAuthMessage } = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError(notAuthMessage);
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'some-key' : SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError(notAuthMessage));
    return;
  }
  req.user = payload;
  next();
};
