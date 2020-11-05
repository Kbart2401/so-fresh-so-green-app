const { validationResult } = require('express-validator');
const { User } = require('./db/models')
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next)

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req)
  const errors = validationErrors.array().map(error => error.msg);
  if (!validationErrors.isEmpty()) {
    const err = Error('Bad request');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request';
    res.render('create-user', {
      title: 'Create User',
      errors,
      name: req.body.name,
      city: req.body.city,
      email: req.body.email,
      bio: req.body.bio,
      csrfToken: req.csrfToken()
    })
  }
  next();
}

const handlePostValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req)
  const errors = validationErrors.array().map(error => error.msg);
  if (!validationErrors.isEmpty()) {
    const err = Error('Bad request');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request';
    res.render('create-post', {
      title: 'Create Post',
      errors,
      content: req.body.content,
      announcements: req.body.announcements,
      csrfToken: req.csrfToken()
    })
  }
  next();
}

const handleUserValidationErrors = async (req, res, next) => {
  const validationErrors = validationResult(req)
  const errors = validationErrors.array().map(error => error.msg);
  const user = await User.findByPk(req.session.auth.userId);
  if (!validationErrors.isEmpty()) {
    const err = Error('Bad request');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request';
    res.render('user-settings', {
      title: 'User Settings',
      user,
      errors,
      id: req.body.id,
      name: req.body.name,
      city: req.body.city,
      email: req.body.email,
      bio: req.body.bio,
      csrfToken: req.csrfToken()
    })
  }
  next();
}

module.exports = {
  asyncHandler, handleValidationErrors,
  handlePostValidationErrors, handleUserValidationErrors
}