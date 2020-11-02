const { validationResult } = require('express-validator');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next)

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req)
  const errors = validationErrors.array().map(error => error.msg);
  if (!validationErrors.isEmpty()) {
    const err = Error('Bad request');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request';
    return next(err);
  }
  next();
}

module.exports = { asyncHandler, handleValidationErrors }