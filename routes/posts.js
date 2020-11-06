const express = require("express");
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require("../utils");
const bcrypt = require("bcryptjs");
const { Comment, User, Post, Upvote } = require("../db/models");
const csrf = require("csurf");
const cookieParser = require('cookie-parser');
const { check, validationResult } = require('express-validator');
const { logInUser, logoutUser, restoreUser } = require("../auth");

const csrfProtection = csrf({ cookie: true });

/******Render Create Post********/
router.get('/', csrfProtection, restoreUser, asyncHandler(async (req, res,) => {
  if (!req.session.auth) {
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

router.get("/:id/edit", csrfProtection, restoreUser, asyncHandler(async (req, res) => {
  if (!req.session.auth) {
    return res.redirect('/users/login')
  }

  const user = res.locals.user;
  const postId = parseInt(req.params.id, 10)

  const post = await Post.findByPk(postId)

  if (user.id !== post.userId) {
    return res.redirect("/")
  }


  res.render('edit-post.pug', { csrfToken: req.csrfToken(), title: "Edit Post", user: res.locals.user, post })
}))

router.post("/:id/edit", csrfProtection, restoreUser, asyncHandler(async (req, res) => {
  const { content, announcements, imageUrl } = req.body

  const postId = parseInt(req.params.id, 10)

  const post = await Post.findByPk(postId)

  post.content = content;
  post.announcements = announcements;
  post.imageUrl = imageUrl;

  await post.save();

  res.redirect("/")
}))

router.get("/:id/delete", restoreUser, asyncHandler(async (req, res) => {
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

router.post('/:id/comments', restoreUser, asyncHandler(async (req, res) => {
  const { content } = req.body;
  const postId = parseInt(req.params.id, 10);
  if (content !== '') {
    const user = res.locals.user;
    const comment = await Comment.create({ content, userId: user.id, postId });
  }
  const comments = await Comment.findAll({ where: { postId } })
  console.log(comments)
  return res.json({ comments });
}))


//fetch comments
router.get('/:id/comments', restoreUser, asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const comments = await Comment.findAll({ where: { postId } })
  console.log(comments)
  return res.json({ comments });
}))



router.patch('/:id/upvote', restoreUser, asyncHandler(async (req, res) => {
  const userId = res.locals.user.id
  const postId = parseInt(req.params.id, 10);

  const post = await Upvote.findOne({where: {userId, postId}})

  if(!post) {
    await Upvote.create({
      userId,
      postId
    })
  }
  
  
  const upvotes = await Upvote.count({
  where: {
    postId
  }
})
  
  return res.json({ upvotes })
}))


router.delete('/:id/downvote', restoreUser, asyncHandler(async (req, res) => {
  const user = res.locals.user;
  const postId = parseInt(req.params.id, 10);
  
  //need to get Upvote Id!
  await Upvote.destroy({
    where: {
      postId,
      userId: user.id
    }
  })
  const upvotes = await Upvote.count({
    where: {
      postId
    }
  })
  console.log("upvote deleted")
  return res.json({ upvotes })
}))




module.exports = router;

