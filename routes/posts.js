const express = require("express");
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");
const bcrypt = require("bcryptjs");
const { User, Post } = require("../db/models");
const csrf = require("csurf");
const cookieParser = require('cookie-parser');
const { check, validationResult } = require('express-validator');
const { logInUser, logoutUser, restoreUser } = require("../auth");


router.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

const validateForm = [
  check("content")
    .exists({ checkFalsy: true})
    .withMessage("Please provide content"),
  check("imageUrl")
    .exists({checkFalsy: true})
    .withMessage("Please select an image")
]

router.get('/', csrfProtection, asyncHandler(async (req, res,) => {
  if(!req.session.auth) {
    return res.redirect('/')
  }
  res.render('create-post', { csrfToken: req.csrfToken(), title: "Create Post" })
}))

router.post('/', csrfProtection, validateForm, handleValidationErrors, restoreUser, asyncHandler(async (req, res) => {
  const { content, announcements, imageUrl } = req.body
  const user = res.locals.user;
  await Post.create({
    userId: user.id,
    content, announcements, imageUrl
  })
  res.redirect('/');

}))


module.exports = router;