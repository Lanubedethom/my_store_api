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

module.exports = {
  checkApiKey
}


