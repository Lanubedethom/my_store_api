export const logError = (err, req, res, next) => {
  console.error(err.output.payload);
  next(err);
}

export const handlerError = (err, req, res, next) => {
  res.status(500).json({
    message: err.message
  })
};


