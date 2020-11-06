var express = require('express');
var router = express.Router();
const { User, Post, Comment } = require('../db/models')
const { asyncHandler } = require('../utils')
const { restoreUser } = require("../auth")

/**********Search Bar*********/
router.post('/:search)', restoreUser, asyncHandler(async (req, res) => {
  const user = res.locals.user;
  const searchRes = req.params.searchRes
  const posts = await Post.findAll({ include: [User, "Users", Comment], limit: 10, order: [["createdAt", 'DESC']] })
  posts.map(post => {
    let announcements = post.announcements.split("\n")
    post.announcements = announcements
    //posts.Users.length shows how many upvotes
    return post
  });
  res.render('index', { title: 'Searching...', user, posts });
}))

module.exports = router;