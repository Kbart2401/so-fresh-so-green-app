const express = require("express");
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");
const bcrypt = require("bcryptjs");
const { User, Post } = require("../db/models");
const csrf = require("csurf");
const cookieParser = require('cookie-parser');
const { check, validationResult } = require('express-validator');
const { logInUser, logoutUser, restoreUser } = require("../auth");

const csrfProtection = csrf({ cookie: true });

router.get('/', csrfProtection, asyncHandler(async (req, res,) => {
  if(!req.session.auth) {
    return res.redirect('/')
  }
  res.render('create-post', { csrfToken: req.csrfToken() })
}))

router.post('/', csrfProtection, restoreUser, asyncHandler(async (req, res) => {
  const user = res.locals.user;
  const { content, announcements, imageUrl } = req.body
  const post = await Post.create({
    userId: user.id,
    content, announcements, imageUrl
  })
  res.redirect('/');

}))


module.exports = router;