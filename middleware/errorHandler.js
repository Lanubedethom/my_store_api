const { ValidationError } = require("sequelize");

const logError = (err, req, res, next) => {
  console.error(err);
  next(err);
}

const ormValidationError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      errors: err.errors
    })
  }
}

const handlerError = (err, req, res, next) => {
  res.status(500).json({
    message: err.message
  })
};

module.exports = {
  logError,
  ormValidationError,
  handlerError
}


