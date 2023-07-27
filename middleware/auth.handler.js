const boom = require('@hapi/boom');
const { apiKey } = require('../config/config');

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['api'];
  if (apiKey === apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

const checkAdminRole = (req, res, next) => {
  const user = req.user;
  if (user.role === 'admin') next();
  else next(boom.unauthorized());
}

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) next();
    else next(boom.unauthorized());
  }
}

module.exports = {
  checkApiKey,
  checkAdminRole,
  checkRoles
}


