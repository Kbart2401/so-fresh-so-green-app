var express = require("express");
var router = express.Router();
const { User, Post, Comment } = require("../db/models");
const { asyncHandler } = require("../utils");
const { restoreUser } = require("../auth");

/* GET home page. */
router.get(
  "/",
  restoreUser,
  asyncHandler(async function (req, res, next) {
    let user;
    if (res.locals.authenticated) {
      user = await User.findByPk(req.session.auth.userId);
    }
    const posts = await Post.findAll({
      include: [User, "Users", Comment],
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    posts.map((post) => {
      let announcements = post.announcements.split("\n");
      post.announcements = announcements;
      //posts.Users.length shows how many upvotes
      return post;
    });
    res.render("index", {
      title: "Farm Feed",
      user,
      posts,
    });
  })
);


module.exports = router;
