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

/******Render Create Post********/
router.get('/', csrfProtection, restoreUser, asyncHandler(async (req, res,) => {
  if(!req.session.auth) {
    return res.redirect('/users/login')
  }
  res.render('create-post', { csrfToken: req.csrfToken(), title: "Create Post", user: res.locals.user })
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

router.get("/:id/edit", csrfProtection,restoreUser, asyncHandler(async (req,res) => {
  if(!req.session.auth) {
    return res.redirect('/users/login')
  }

  const user = res.locals.user;
  const postId = parseInt(req.params.id, 10)

  const post = await Post.findByPk(postId)

  if (user.id !== post.userId) {
    return res.redirect("/")
  }


  res.render('edit-post.pug', { csrfToken: req.csrfToken(), title: "Edit Post", user: res.locals.user, post})
}))

router.post("/:id/edit", csrfProtection, restoreUser, asyncHandler( async (req, res) => {
  const { content, announcements, imageUrl} = req.body

  const postId = parseInt(req.params.id, 10)

  const post = await Post.findByPk(postId)

  post.content = content;
  post.announcements = announcements;
  post.imageUrl = imageUrl;

  await post.save();

  res.redirect("/")
}))

router.get("/:id/delete", restoreUser, asyncHandler(async (req,res) => {
  if (!req.session.auth) {
    return res.redirect("/users/login")
  }

  const user = res.locals.user;
  const postId = parseInt(req.params.id, 10)
  const post = await Post.findByPk(postId)

  if (user.id !== post.userId) {
    return res.redirect("/")
  }

  await post.destroy();
  res.redirect("/")

}))


module.exports = router;