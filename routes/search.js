var express = require('express');
var router = express.Router();
const { User, Post, Comment, Sequelize } = require('../db/models')
const { asyncHandler } = require('../utils')
const { restoreUser } = require("../auth");
const connectPgSimple = require('connect-pg-simple');
const Op = Sequelize.Op;

/**********Search Bar*********/
router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const user = res.locals.user;
  const searchRes = req.query.search
  const posts = await Post.findAll({
    where: {
      [Op.or]: [{
        content: {
          [Op.iLike]: `%${searchRes}%`,
        }
      }, {
    announcements: {
          [Op.iLike]: `%${searchRes}%`,
    }}]
    }, include: [User, "Users", Comment]

  })
  const users = await User.findAll({
    where: {
      [Op.or]: [{
        name: {
          [Op.iLike]: `%${searchRes}%`,
        }
      }, {
        city: {
          [Op.iLike]: `%${searchRes}%`,
        }
      }]
    }, include: [{model: Post, include: [User, "Users", Comment]}]
  })
  const userPosts = users.map(user => {
    posts.push(...user.Posts)
    return user.Posts
  })
  posts.map(post => {
    let announcements = post.announcements.split("\n")
    post.announcements = announcements
    //posts.Users.length shows how many upvotes
    return post
  });


  if (!posts) res.render('index', { title: 'Your search did not match any posts', user, posts });
  res.render('index', { title: 'Farm Field', searchResults: 'SEARCH RESULTS', user, posts });
}))

module.exports = router;